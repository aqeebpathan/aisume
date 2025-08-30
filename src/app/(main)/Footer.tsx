import Logo from "@/assets/icon.svg"

const Footer = () => {
  return (
    <footer className="relative z-10 border-t border-neutral-100 px-4 py-6 dark:border-neutral-800">
      <div className="container mx-auto flex flex-col items-center justify-between md:flex-row">
        <div className="mb-6 flex items-center space-x-3 md:mb-0">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-black dark:bg-white">
            <Logo className="text-white dark:text-black" />
          </div>
          <span className="font-medium text-neutral-600 dark:text-neutral-400">
            © 2025 AIsume. Crafted with intelligence.
          </span>
        </div>
        <div className="flex space-x-8 text-sm">
          <a
            href="#"
            className="group relative font-medium text-neutral-500 transition-colors hover:text-black dark:text-neutral-400 dark:hover:text-white"
          >
            Privacy
            <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-black transition-all group-hover:w-full dark:bg-white"></span>
          </a>
          <a
            href="#"
            className="group relative font-medium text-neutral-500 transition-colors hover:text-black dark:text-neutral-400 dark:hover:text-white"
          >
            Terms
            <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-black transition-all group-hover:w-full dark:bg-white"></span>
          </a>
          <a
            href="#"
            className="group relative font-medium text-neutral-500 transition-colors hover:text-black dark:text-neutral-400 dark:hover:text-white"
          >
            Support
            <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-black transition-all group-hover:w-full dark:bg-white"></span>
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
