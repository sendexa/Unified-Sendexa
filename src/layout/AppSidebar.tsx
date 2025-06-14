"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSidebar } from "../context/SidebarContext";
import { ChevronDownIcon, GridIcon, HorizontaLDots } from "../icons/index";
import {
  // CreditCard,
  // Store,
  // List,
  User,
  // Shield,
  // Terminal,
  MessageCircle,
  Landmark,
  ReceiptCent,
  // User2,
  Users,
  // ChartPie,
  LockKeyhole,
  Wallet,
  Banknote,
  KeyRound,
  // PhoneCall,
  PieChart,
  // Send,
  // Repeat,
  // Hash,
  // DollarSign,
  // Vote,
  // TicketIcon,
} from "lucide-react";
// import SidebarWidget from "./SidebarWidget";

type NavItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
  subItems?: { name: string; path: string; pro?: boolean; new?: boolean; badge?: string }[];
  pro?: boolean;
};

const navItems: NavItem[] = [
  {
    icon: <GridIcon />,
    name: "Dashboard",
    path: "/",
  },
];

const FintechItems: NavItem[] = [
  {
    icon: <Banknote />,
    name: "Payments",
    path: "/fintech/payments",
  },
  {
    icon: <ReceiptCent />,
    name: "Invoicing",
    subItems: [
      { name: "All Invoices", path: "/fintech/invoicing" },
      { name: "Recurring Invoices", path: "/fintech/invoicing/recurring", pro: true },
      { name: "Quotes & Estimates", path: "/fintech/invoicing/estimates", pro: true },
    ],
  },
  {
    icon: <Users />,
    name: "Customers",
    path: "/fintech/customers",
  },
  {
    icon: <Landmark />,
    name: "Money",
    subItems: [
      { name: "Send Money", path: "/fintech/money/send" },
      { name: "Request Money", path: "/fintech/money/request", pro: true },
      { name: "Transfer History", path: "/fintech/money/history" },
      { name: "Approvals", path: "/fintech/money/approvals" },
    ],
  },
  {
    icon: <Wallet />,
    name: "Wallets",
    subItems: [
      { name: "Wallets", path: "/fintech/wallets" },
      { name: "Bank Accounts", path: "/fintech/accounts" },
      { name: "Payout Settings", path: "/fintech/settlement/payout" },
    ],
  },
  // {
  //   icon: <CreditCard />,
  //   name: "Cards",
  //   subItems: [
  //     { name: "Virtual Cards", path: "/fintech/cards/virtual", pro: true },
  //     { name: "Card Controls", path: "/fintech/cards/manage", pro: true },
  //   ],
  // },
  // {
  //   icon: <Repeat />,
  //   name: "Subscriptions",
  //   path: "/fintech/subscriptions",
  //   pro: true,
  // },
];

const CommunicationItems: NavItem[] = [
  {
    icon: <MessageCircle />,
    name: "SMS",
    subItems: [
      { name: "Send SMS", path: "/sms/send" },
      { name: "Sender IDs", path: "/sms/sender-ids", badge: "new" },
      { name: "Contacts", path: "/sms/contacts" },
      { name: "Templates", path: "/sms/templates", badge: "new" },
      // { name: "Groups & Segments", path: "/sms/groups", pro: true },
    ],
  },
  {
    icon: <LockKeyhole />,
    name: "OTP",
    subItems: [
      { name: "Overview", path: "/otp/overview" },
      { name: "OTP Logs", path: "/otp/logs" },
      { name: "Channels", path: "/otp/channels", badge: "beta" },
    ],
  },
  // {
  //   icon: <PhoneCall />,
  //   name: "Voice",
  //   subItems: [
  //     { name: "Call Campaigns", path: "/voice/campaigns", pro: true },
  //     { name: "IVR Setup", path: "/voice/ivr", pro: true },
  //     { name: "Voice Logs", path: "/voice/logs" },
  //   ],
  // },
  // {
  //   icon: <Send />,
  //   name: "Email",
  //   subItems: [
  //     { name: "Send Email", path: "/email/send" },
  //     { name: "Email Contacts", path: "/email/contacts" },
  //     { name: "Email Templates", path: "/email/templates" },
  //     { name: "Email Logs", path: "/email/logs" },
  //   ],
  // },
  {
    icon: <PieChart />,
    name: "Reports",
    subItems: [
      { name: "Payment History", path: "/reports/payments" },
      { name: "SMS Delivery", path: "/reports/sms" },
      // { name: "Email Logs", path: "/reports/email" },
      { name: "OTP Reports", path: "/reports/otp" },
      // { name: "Voice Usage", path: "/reports/voice" },
    ],
  },
];



// const CommunicationItems: NavItem[] = [
//   {
//     icon: <MessageCircle />,
//     name: "SMS",
//     subItems: [
//       { name: "Send SMS", path: "/sms/send" }, 
//       { name: "Sender IDs", path: "/sms/sender-ids", new: true },
//       { name: "My Contacts", path: "/sms/contacts" },
//       { name: "SMS Templates", path: "/sms/templates", new: true },
//     ],
//   },
//   {
//     icon: <LockKeyhole/>,
//     name: "OTP",
//     subItems: [
//       { name: "Overview", path: "/otp/overview" },
//       { name: "OTP Logs", path: "/otp/logs" },
//     ],
//   },
//   {
//     icon: <ChartPie />,
//     name: "Reports",
//     subItems: [
//       { name: "Payment History", path: "/reports/payments" }, 
//       { name: "SMS Delivery Reports", path: "/reports/sms" },
//     ],
//   },
// ];

const othersItems: NavItem[] = [
  {
    icon: <User />,
    name: "Profile",
    subItems: [
      { name: "Personal Info", path: "/account/profile/personal" },
      { name: "Business Info", path: "/account/profile/business" },
      { name: "Security Settings", path: "/account/profile/security" },
    ],
  },
  {
    icon: <KeyRound />,
    name: "API & Developer",
    subItems: [
      { name: "API Keys", path: "/account/api/keys" },
      { name: "API Logs", path: "/account/api/logs" },
      { name: "IP Whitelisting", path: "/account/api/whitelist" },
      { name: "Webhooks", path: "/account/api/webhooks", badge: "beta" },
    ],
  },
];


// const othersItems: NavItem[] = [
//   {
//     icon: <User />,
//     name: "Profile",
//     subItems: [
//       { name: "Personal Info", path: "/account/profile/personal" },
//       { name: "Business Info", path: "/account/profile/business" },
//     ],
//   },
//   {
//     icon: <KeyRound />,
//     name: "API Keys",
//      subItems: [
//       { name: "API Keys", path: "/user/api-keys" },
//       { name: "API Logs", path: "/account/api/logs" },
//       { name: "IP Whitelisting", path: "/account/api/whitelist" },
//     ],
//   },
// ];

const AppSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const pathname = usePathname();

  const renderMenuItems = (
    navItems: NavItem[],
    menuType:
      | "main"
      | "others"
      | "Fintech"
      | "Communication"
      | "Cloud"
      | "Software & Web"
      | "Media"
      | "Growth"
  ) => (
    <ul className="flex flex-col gap-4">
      {navItems.map((nav, index) => (
        <li key={nav.name}>
          {nav.subItems ? (
            <button
              onClick={() => handleSubmenuToggle(index, menuType)}
              className={`menu-item group  ${
                openSubmenu?.type === menuType && openSubmenu?.index === index
                  ? "menu-item-active"
                  : "menu-item-inactive"
              } cursor-pointer ${
                !isExpanded && !isHovered
                  ? "lg:justify-center"
                  : "lg:justify-start"
              }`}
            >
              <span
                className={` ${
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? "menu-item-icon-active"
                    : "menu-item-icon-inactive"
                }`}
              >
                {nav.icon}
              </span>
              {(isExpanded || isHovered || isMobileOpen) && (
                <span className={`menu-item-text`}>{nav.name}</span>
              )}
              {(isExpanded || isHovered || isMobileOpen) && (
                <ChevronDownIcon
                  className={`ml-auto w-5 h-5 transition-transform duration-200  ${
                    openSubmenu?.type === menuType &&
                    openSubmenu?.index === index
                      ? "rotate-180 text-brand-500"
                      : ""
                  }`}
                />
              )}
            </button>
          ) : (
            nav.path && (
              <Link
                href={nav.path}
                className={`menu-item group ${
                  isActive(nav.path) ? "menu-item-active" : "menu-item-inactive"
                }`}
              >
                <span
                  className={`${
                    isActive(nav.path)
                      ? "menu-item-icon-active"
                      : "menu-item-icon-inactive"
                  }`}
                >
                  {nav.icon}
                </span>
                {(isExpanded || isHovered || isMobileOpen) && (
                  <span className={`menu-item-text`}>{nav.name}</span>
                )}
              </Link>
            )
          )}
          {nav.subItems && (isExpanded || isHovered || isMobileOpen) && (
            <div
              ref={(el) => {
                subMenuRefs.current[`${menuType}-${index}`] = el;
              }}
              className="overflow-hidden transition-all duration-300"
              style={{
                height:
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? `${subMenuHeight[`${menuType}-${index}`]}px`
                    : "0px",
              }}
            >
              <ul className="mt-2 space-y-1 ml-9">
                {nav.subItems.map((subItem) => (
                  <li key={subItem.name}>
                    <Link
                      href={subItem.path}
                      className={`menu-dropdown-item ${
                        isActive(subItem.path)
                          ? "menu-dropdown-item-active"
                          : "menu-dropdown-item-inactive"
                      }`}
                    >
                      {subItem.name}
                      <span className="flex items-center gap-1 ml-auto">
                        {subItem.new && (
                          <span
                            className={`ml-auto ${
                              isActive(subItem.path)
                                ? "menu-dropdown-badge-active"
                                : "menu-dropdown-badge-inactive"
                            } menu-dropdown-badge `}
                          >
                            new
                          </span>
                        )}
                        {subItem.pro && (
                          <span
                            className={`ml-auto ${
                              isActive(subItem.path)
                                ? "menu-dropdown-badge-active"
                                : "menu-dropdown-badge-inactive"
                            } menu-dropdown-badge `}
                          >
                            pro
                          </span>
                        )}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </li>
      ))}
    </ul>
  );

  const [openSubmenu, setOpenSubmenu] = useState<{
    type:
      | "main"
      | "others"
      | "Fintech"
      | "Communication"
      | "Cloud"
      | "Software & Web"
      | "Media"
      | "Growth";
    index: number;
  } | null>(null);
  const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>(
    {}
  );
  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // const isActive = (path: string) => path === pathname;
  const isActive = useCallback((path: string) => path === pathname, [pathname]);

  useEffect(() => {
    // Check if the current path matches any submenu item
    let submenuMatched = false;
    ["main", "others"].forEach((menuType) => {
      const items = menuType === "main" ? navItems : othersItems;
      items.forEach((nav, index) => {
        if (nav.subItems) {
          nav.subItems.forEach((subItem) => {
            if (isActive(subItem.path)) {
              setOpenSubmenu({
                type: menuType as
                  | "main"
                  | "others"
                  | "Communication"
                  | "Cloud"
                  | "Fintech"
                  | "Software & Web"
                  | "Media"
                  | "Growth",
                index,
              });
              submenuMatched = true;
            }
          });
        }
      });
    });

    // If no submenu item matches, close the open submenu
    if (!submenuMatched) {
      setOpenSubmenu(null);
    }
  }, [pathname, isActive]);

  useEffect(() => {
    // Set the height of the submenu items when the submenu is opened
    if (openSubmenu !== null) {
      const key = `${openSubmenu.type}-${openSubmenu.index}`;
      if (subMenuRefs.current[key]) {
        setSubMenuHeight((prevHeights) => ({
          ...prevHeights,
          [key]: subMenuRefs.current[key]?.scrollHeight || 0,
        }));
      }
    }
  }, [openSubmenu]);

  const handleSubmenuToggle = (
    index: number,
    menuType:
      | "main"
      | "others"
      | "Fintech"
      | "Communication"
      | "Cloud"
      | "Software & Web"
      | "Media"
      | "Growth"
  ) => {
    setOpenSubmenu((prevOpenSubmenu) => {
      if (
        prevOpenSubmenu &&
        prevOpenSubmenu.type === menuType &&
        prevOpenSubmenu.index === index
      ) {
        return null;
      }
      return { type: menuType, index };
    });
  };

  return (
    <aside
      className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200 
        ${
          isExpanded || isMobileOpen
            ? "w-[290px]"
            : isHovered
            ? "w-[290px]"
            : "w-[90px]"
        }
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`py-8 flex  ${
          !isExpanded && !isHovered ? "lg:justify-center" : "justify-start"
        }`}
      >
        <Link href="/">
          {isExpanded || isHovered || isMobileOpen ? (
            <>
              <Image
                src="/images/logo/Site-Logo.png"
                alt="Xtotel Logo"
                width={150}
                height={40}
              />
              {/* <Image
                className="dark:hidden"
                src="/images/logo/logo.svg"
                alt="Logo"
                width={150}
                height={40}
              /> */}

              {/* <Image 
              className="hidden dark:block"
              src="/images/logo/xtottel-logo-white.png" 
              alt="Xtotel Logo" 
              width={150} 
              height={40} 
              /> */}
              {/* <Image
                className="hidden dark:block"
                src="/images/logo/logo-dark.svg"
                alt="Logo"
                width={150}
                height={40}
              /> */}
            </>
          ) : (
            <Image
              src="/images/logo/logo-icon.svg"
              alt="Logo"
              width={32}
              height={32}
            />
          )}
        </Link>
      </div>
      <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
        <nav className="mb-6">
          <div className="flex flex-col gap-4">
            <div>
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  "Menu"
                ) : (
                  <HorizontaLDots />
                )}
              </h2>
              {renderMenuItems(navItems, "main")}
            </div>

            <div className="">
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  "Fintech"
                ) : (
                  <HorizontaLDots />
                )}
              </h2>
              {renderMenuItems(FintechItems, "Fintech")}
            </div>

            <div className="">
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  "Communication"
                ) : (
                  <HorizontaLDots />
                )}
              </h2>
              {renderMenuItems(CommunicationItems, "Communication")}
            </div>

            {/* <div className="">
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${!isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                  }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  "Digital Growth"
                ) : (
                  <HorizontaLDots />
                )}
              </h2>
              {renderMenuItems(GrowthItem, "Growth")}
            </div> */}

            {/* <div className="">
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${!isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                  }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  "Software & Web"
                ) : (
                  <HorizontaLDots />
                )}
              </h2>
              {renderMenuItems(SoftwareWebItems, "Software & Web")}
            </div> */}

            <div className="">
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  "Account & Settings"
                ) : (
                  <HorizontaLDots />
                )}
              </h2>
              {renderMenuItems(othersItems, "others")}
            </div>
          </div>
        </nav>
        {/* {isExpanded || isHovered || isMobileOpen ? <SidebarWidget /> : null} */}
      </div>
    </aside>
  );
};

export default AppSidebar;
