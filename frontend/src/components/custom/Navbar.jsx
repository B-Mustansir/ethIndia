
import { Button } from "../../components/ui/button"
import React, { useRef, useState } from "react"
import { motion, useMotionValueEvent, useScroll } from "framer-motion"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../../components/ui/navigation-menu"

const Navbar = () => {
  const [isHidden, setisHidden] = useState(false)
  const { scrollY } = useScroll()
  const lastYRef = useRef(0)

  useMotionValueEvent(scrollY, "change", (y) => {
    const diff = y - lastYRef.current
    if (Math.abs(diff) > 50) {
      setisHidden(diff > 0)
      lastYRef.current = y
    }
  })

  return (
    <motion.nav
      className="navbar-container flex justify-around items-center w-full h-20 bg-transparent z-50 bg-black"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ ease: "easeOut", duration: 0.8 }}
    >
      <motion.div
        animate={isHidden ? "hidden" : "visible"}
        onFocusCapture={() => setisHidden(false)}
        whileHover="visible"
        variants={{
          hidden: {
            y: "-100%",
          },
          visible: {
            y: "0%",
          },
        }}
        transition={{ duration: 0.3 }}
        className="nav-list w-fit h-16 z-20 px-8 gap-3 list-none flex flex-row justify-center items-center fixed rounded-full border border-neutral-700 bg-gray-900 text-white dark:border-slate-200 dark:bg-slate-100 dark:text-black"
      >
        <h1 className=" font-LindedHill text-xl">PulseChain</h1> |
        <Button variant="ghost">Home</Button> |
        <Button variant="ghost">Features</Button> |
        <Button variant="ghost">Steps</Button> |
        <Button variant="ghost">Sign In</Button> |
        <Button variant="ghost">Contact</Button>
      </motion.div>
    </motion.nav>
  )
}

export default Navbar

