import { LanguageSwitcher } from "../languageSwitcher/LanguageSwitcher";
import ConnectWalletButton from "@/components/ui/buttons/ConnectWalletButton";
import { ThemeToggle } from "../themeToggle/ThemeToggle";

export const Navbar = () => {
  return (
    <nav className="w-full px-6 py-4 bg-nav-light dark:bg-nav-dark flex justify-between items-center">
      <div className="text-xl font-bold text-primary-dark dark:text-primary-light 3xl:text-[10px] font-mono">
        🌐 Web3 FE Boilerplate
      </div>

      <div className="flex items-center gap-4">
        <ConnectWalletButton />
        <LanguageSwitcher />
        <ThemeToggle />
      </div>
    </nav>
  );
};
