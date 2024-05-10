import React from "react";
import Image from "next/image";
import Link from "next/link";

const SidebarData = [
  {
    id: 1,
    image: "/svg/cube.svg",
    title: "categories",
    href:"/"
  },
  {
    id: 2,
    image: "/svg/setting.svg",
    title: "setting",
  },
  {
    id: 3,
    image: "/svg/cube.svg",
    title: "Admin form",
    href: "/admin-form",
  },
];

const ImageData = [
  {
    id: 1,
    image: "/svg/linkedin.svg",
  },
  {
    id: 2,
    image: "/svg/instagram.svg",
  },
  {
    id: 3,
    image: "/svg/twitter.svg",
  },
  {
    id: 4,
    image: "/svg/youtube.svg",
  },
];
export const Sidebar = () => {
  return (
    <>
      {/* Sidebar */}
      <div
        className='w-[400px] flex flex-col gap-2 h-[calc(100vh-116px)] p-2 bg-gray-200 shadow-xl'
        style={{ width: 400 }}
      >
        <div className=' w-full 2xl:min-h-[400px] 3xl:min-h-[600px] border-b border-b-[#1f2937]'>
          <div className='flex flex-col gap-2 pl-4 pt-4'>
            {SidebarData.map((item, index) => (
              <Link href={item?.href || ""} key={index} className='flex gap-3'>
                <Image
                  src={item.image}
                  alt='categories'
                  width={25}
                  height={25}
                />
                <span className='text-gray-800 text-[18px] font-medium'>
                  {item.title}
                </span>
              </Link>
            ))}
          </div>
        </div>
        <div className='w-full flex items-end pb-7 pl-4 2xl:min-h-[calc(100vh-532px)] 3xl:min-h-[calc(100vh-732px)] '>
          <div className='flex h-fit items-center gap-2'>
            {ImageData.map((item, index) => (
              <div className='cursor-pointer' key={index}>
                <Image
                  src={item.image}
                  alt='icon'
                  width={25}
                  height={25}
                  className='object-cover'
                />
              </div>
            ))}
          </div>
        </div>
        {/* Add sidebar content or navigation links here */}
      </div>
    </>
  );
};
