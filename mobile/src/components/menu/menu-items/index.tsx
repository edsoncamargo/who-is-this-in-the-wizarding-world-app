import { MotiView } from "moti";

import Route from "@/@types/routes";
import MenuItem from "@/components/menu/menu-item";

export default function MenuItems() {
  const menuItems: Array<{ href: Route; text: string }> = [
    {
      href: "/quiz/levels",
      text: "Play Quiz",
    },
    {
      href: "/explore-characters/",
      text: "Explore Characters",
    },
    {
      href: "/how-to-play/",
      text: "How to Play",
    },
    {
      href: "/about/",
      text: "About",
    },
  ];

  function generateMenuItems() {
    return menuItems.map((item, index) => (
      <MotiView
        key={index}
        className="self-center pb-4"
        from={{ opacity: 0, translateX: index % 2 === 0 ? 30 : -30 }}
        animate={{ opacity: 1, translateX: 0 }}
        transition={{ type: "spring", delay: index * 50 }}
      >
        <MenuItem href={item.href} text={item.text} index={index} />
      </MotiView>
    ));
  }

  return <>{generateMenuItems()}</>;
}
