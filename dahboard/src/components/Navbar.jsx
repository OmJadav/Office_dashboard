import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, useLocation } from "react-router-dom";
import { Dropdown } from "flowbite-react";
const user = JSON.parse(localStorage.getItem("currentUser"));
const navigation = [
  { name: "Home", link: "/home", current: false },
  { name: "Expenses", link: "/expenses", current: false },
  { name: "Report", link: "/report", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
export default function Navbar() {
  const { pathname } = useLocation();
  const signOut = () => {
    localStorage.removeItem("currentUser");
    window.location.href = "/";
  };
  return (
    <>
      <div className="min-h-full">
        <Disclosure as="nav" className="bg-gray-800">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                  <div className="flex items-center">
                    <div>
                      <Link to={"/home"}>
                        <p className="text-white text-2xl font-bold">
                          Shraddha Computers
                        </p>
                      </Link>
                    </div>
                    {/* <div className="flex-shrink-0">
                      <img
                        className="h-8 w-8"
                        src=""
                        alt="Your Company"
                      />
                    </div> */}
                    <div className="hidden md:block">
                      <div className="ml-10 flex items-baseline space-x-4">
                        {navigation.map((item) => (
                          <Link
                            key={item.name}
                            to={item.link}
                            className={classNames(
                              pathname === item.link
                                ? "bg-gray-900 text-white"
                                : "text-gray-300 hover:bg-gray-700 hover:text-white",
                              "rounded-md px-3 py-2 text-sm font-medium"
                            )}
                            aria-current={
                              pathname === item.link ? "page" : undefined
                            }
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6">
                      {/* Profile dropdown */}
                      <Dropdown
                        label={`👤 ${user.name}`}
                        dismissOnClick={false}
                      >
                        {/* <Dropdown.Item>Dashboard</Dropdown.Item>
                        <Dropdown.Item>Settings</Dropdown.Item>
                        <Dropdown.Item>Earnings</Dropdown.Item> */}
                        <Dropdown.Item onClick={signOut}>
                          Sign out
                        </Dropdown.Item>
                      </Dropdown>
                    </div>
                  </div>
                  <div className="-mr-2 flex md:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-0.5" />
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      ) : (
                        <Bars3Icon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="md:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                  {navigation.map((item) => (
                    <Link to={item.link}>
                      <Disclosure.Button
                        key={item.name}
                        as="a"
                        className={classNames(
                          pathname === item.link
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "block rounded-md px-3 text-center py-2 text-sm font-medium"
                        )}
                        aria-current={
                          pathname === item.link ? "page" : undefined
                        }
                      >
                        {item.name}
                      </Disclosure.Button>
                    </Link>
                  ))}
                </div>
                <div className="border-t border-gray-700 pb-3 pt-4">
                  <div className="flex items-center px-5">
                    <div className="flex-shrink-0">
                      <img
                        className="h-10 w-10 rounded-full"
                        src="https://raw.githubusercontent.com/OmJadav/Social-Media-App/main/frontend/src/assets/userprofile.png"
                        alt=""
                      />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium leading-none text-white">
                        {user.name}
                      </div>
                      <div className="text-sm font-medium leading-none text-gray-400">
                        {user.email}
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 space-y-1 px-2">
                    {/* {userNavigation.map((item) => ( */}
                    <Disclosure.Button
                      // key={item.name}
                      as="a"
                      onClick={signOut}
                      className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                    >
                      Sign Out
                    </Disclosure.Button>
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </>
  );
}
