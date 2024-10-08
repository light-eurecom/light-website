'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Popover } from '@headlessui/react'
import { AnimatePresence, motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/landing/Container'
import { Logo } from '@/components/landing/Logo'
import { NavLinks } from '@/components/landing/NavLinks'
import clsx from 'clsx'
import { useServerStatus } from '@/context/ServerStatusContext'
import Cta from '../cta'

function MenuIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M5 6h14M5 18h14M5 12h14"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ChevronUpIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M17 14l-5-5-5 5"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function MobileNavLink(
  props: Omit<
    React.ComponentPropsWithoutRef<typeof Popover.Button<typeof Link>>,
    'as' | 'className'
  >,
) {
  return (
    <Popover.Button
      as={Link}
      className="block text-base leading-7 tracking-tight"
      {...props}
    />
  )
}

export function Header() {
  const [scrolledFromTop, setScrolledFromTop] = useState(false);
  const { serverUp } = useServerStatus()

  useEffect(() => {
    function onScroll() {
      let currentPosition = window.pageYOffset;
      if (scrolledFromTop === false && currentPosition > 80) {
        setScrolledFromTop(true);
      } else if (scrolledFromTop === true && currentPosition < 80) {
        setScrolledFromTop(false);
      }
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [scrolledFromTop]);
  return (
    <header className={clsx('fixed top-0 right-0 left-0 bg-transparent z-50', scrolledFromTop && "border-b border-gray-300/20 backdrop-blur-sm ")}>
      <nav>
        <Container className="relative flex justify-between py-4">
          <div className="relative z-10 flex items-center gap-16">
            <Link href="/" aria-label="Home">
              <Logo className="w-auto" />
            </Link>
            <div className="hidden lg:flex lg:gap-10">
              <NavLinks />
            </div>
          </div>
          <div className="flex items-center gap-6">
            <Popover className="lg:hidden">
              {({ open }) => (
                <>
                  <Popover.Button
                    className="relative z-10 -m-2 inline-flex items-center rounded-lg stroke-foreground p-2 hover:bg-foreground/5 ui-not-focus-visible:outline-none"
                    aria-label="Toggle site navigation"
                  >
                    {({ open }) =>
                      open ? (
                        <ChevronUpIcon className="h-6 w-6" />
                      ) : (
                        <MenuIcon className="h-6 w-6" />
                      )
                    }
                  </Popover.Button>
                  <AnimatePresence initial={false}>
                    {open && (
                      <>
                        <Popover.Overlay
                          static
                          as={motion.div}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="fixed inset-0 z-0 backdrop-blur"
                        />
                        <Popover.Panel
                          static
                          as={motion.div}
                          initial={{ opacity: 0, y: -32 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{
                            opacity: 0,
                            y: -32,
                            transition: { duration: 0.2 },
                          }}
                          className="absolute inset-x-0 top-0 z-0 origin-top rounded-b-2xl px-6 pb-6 pt-32 shadow-2xl shadow-gray-900/20"
                        >
                          <div className="space-y-4">
                            <MobileNavLink href="/#features">
                              Features
                            </MobileNavLink>
                            <MobileNavLink href="/#demos">
                              Demos
                            </MobileNavLink>
                            <MobileNavLink href="/#contact">Contact</MobileNavLink>
                          </div>
                          <div className="mt-8 flex flex-col gap-4">
                            <Link href="/playground"><Button>Playground</Button></Link>
                          </div>
                        </Popover.Panel>
                      </>
                    )}
                  </AnimatePresence>
                </>
              )}
            </Popover>
            {/* <Button href="/login" variant="outline" className="hidden lg:block">
              Log in
            </Button> */}
            <Cta />

          </div>
        </Container>
      </nav>
    </header>
  )
}
