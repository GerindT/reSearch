import { Breadcrumb } from "flowbite-react";
import { HiHome } from "react-icons/hi";
import { Tabs } from "flowbite-react";
import { HiAdjustments, HiUserCircle } from "react-icons/hi";
import { IoStarSharp } from "react-icons/io5";
import { useState } from "react";

import PaperFull from "../components/PaperFull";

const customTheme = {
  base: "flex flex-col gap-2",
  tablist: {
    base: "flex text-center",
    styles: {
      default: "flex-wrap border-b border-gray-200 dark:border-gray-700",
      underline:
        "flex-wrap -mb-px border-b border-gray-200 dark:border-gray-700",
      pills:
        "flex-wrap font-medium text-sm text-gray-500 dark:text-gray-400 space-x-2",
      fullWidth:
        "w-full text-sm font-medium divide-x divide-gray-200 shadow grid grid-flow-col dark:divide-gray-700 dark:text-gray-400 rounded-none",
    },
    tabitem: {
      base: "flex items-center justify-center p-4 rounded-t-lg text-sm font-medium first:ml-0 disabled:cursor-not-allowed disabled:text-gray-400 disabled:dark:text-gray-500 focus:ring-4 focus:ring-blue-300 focus:outline-none",
      styles: {
        default: {
          base: "rounded-t-lg",
          active: {
            on: "bg-gray-100 text-blue-600 dark:bg-gray-800 dark:text-blue-500",
            off: "text-gray-500 hover:bg-gray-50 hover:text-gray-600 dark:text-gray-400 dark:hover:bg-gray-800  dark:hover:text-gray-300",
          },
        },
        underline: {
          base: "rounded-t-lg",
          active: {
            on: "text-blue-600 rounded-t-lg border-b-2 border-blue-600 active dark:text-blue-500 dark:border-blue-500",
            off: "border-b-2 border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300",
          },
        },
        pills: {
          base: "",
          active: {
            on: "rounded-lg bg-blue-600 text-white",
            off: "rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white",
          },
        },
        fullWidth: {
          base: "ml-0 first:ml-0 w-full rounded-none flex",
          active: {
            on: "p-4 text-gray-900 bg-gray-100 active dark:bg-gray-700 dark:text-white rounded-none",
            off: "bg-white hover:text-gray-700 hover:bg-gray-50 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700 rounded-none",
          },
        },
      },
      icon: "mr-2 h-5 w-5",
    },
  },
  tabitemcontainer: {
    base: "",
    styles: {
      default: "",
      underline: "",
      pills: "",
      fullWidth: "",
    },
  },
  tabpanel: "py-3",
};

function Paper() {
  const [isFav, setFav] = useState(false);
  const [isVerified, setVerified] = useState(false);

  return (
    <div className="h-[100vh] mx-[1.5em] md:mx-[4em]">
      <Breadcrumb aria-label="Default breadcrumb example">
        <Breadcrumb.Item href="/" icon={HiHome}>
          Home
        </Breadcrumb.Item>
        <Breadcrumb.Item href="/">Paper</Breadcrumb.Item>
        <Breadcrumb.Item>Paper Short Name</Breadcrumb.Item>
      </Breadcrumb>
      <Tabs
        aria-label="Tabs with icons"
        theme={customTheme} // Apply the custom theme
        style="underline"
        className="mt-[1em]"
      >
        <Tabs.Item
          style={{ color: "red" }}
          active
          title="Paper"
          icon={HiUserCircle}
        >
          <PaperFull
            title="Noteworthy technology acquisitions 2021"
            author="Author example"
            date="2 minutes ago"
            content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque id fuga repudiandae ullam aperiam eos maxime aliquam quibusdam soluta explicabo rerum accusantium non, vitae expedita deleniti nesciunt nisi, asperiores nobis quaerat labore? Veniam dolore deleniti maxime? Totam quam minus quasi, eaque, labore iusto quae ullam voluptas architecto perferendis sit similique quidem maxime doloremque officiis dolorum cum asperiores, magni incidunt. Numquam aperiam voluptate ad reiciendis? Voluptatibus veritatis, voluptate quaerat numquam dolores incidunt ullam voluptates, eius debitis consectetur vero nam id quidem, sit magnam? Eveniet laboriosam reprehenderit, suscipit minima voluptas quia quae fugiat, voluptatem similique atque voluptates, itaque eum autem deleniti expedita obcaecati asperiores cum! Dolorum molestias dignissimos, beatae in, alias fuga aliquam quos sed tempora nulla impedit reprehenderit! Mollitia commodi suscipit harum debitis, autem magni assumenda dolores aperiam aspernatur excepturi esse enim dolorum quidem nam illo cupiditate? Autem, impedit. Veritatis commodi iure nisi eaque quam omnis dolor, odit, nemo a quidem impedit doloribus? Error expedita eveniet earum dolores ullam fuga doloribus explicabo, illo amet illum nesciunt voluptatem accusantium corrupti sed eius soluta esse impedit deleniti optio quia blanditiis. Voluptates doloribus quas possimus, nesciunt accusantium laudantium impedit ad aliquam distinctio? Quod ipsa, obcaecati sit magnam optio veritatis ex itaque. Labore vitae, veritatis adipisci deleniti ullam iusto at, quod aspernatur, tempore ipsam ea iste aliquid voluptas eaque. Quidem facilis sit, dolore assumenda, repellendus expedita aliquam doloribus deleniti dolorem cumque quia et alias, commodi explicabo. Eius alias odit necessitatibus eos facere exercitationem ullam! Eos ipsum, nesciunt atque at, quaerat corporis accusantium libero alias, enim modi magnam repellendus. Voluptas maxime, minus modi quos consectetur voluptatibus provident, quam eligendi enim libero eos consequuntur impedit! Saepe soluta repudiandae at sapiente? Beatae deleniti officiis quibusdam aliquam magnam. Minus dolor doloribus cupiditate eum animi, iste delectus nisi, officiis vitae sunt fuga, quidem accusamus in accusantium vero atque maxime corporis excepturi numquam ea recusandae magnam reiciendis suscipit. Itaque ipsum blanditiis, debitis, quod repudiandae architecto commodi omnis nesciunt veniam molestiae totam! Odio, fugiat amet explicabo sapiente dolore corrupti quia ex voluptas beatae, architecto deleniti est numquam, blanditiis aperiam voluptatibus doloribus magnam delectus sint ratione aut error quo obcaecati quod? Dolor ducimus laboriosam quo non minus voluptate vitae, repellat similique magni placeat adipisci quaerat? Eveniet voluptatibus provident laboriosam at porro ex voluptatum, numquam velit ullam magnam? Voluptate nihil provident quisquam tempora, earum dignissimos neque officiis culpa recusandae nisi libero doloremque modi fuga rem magnam qui eum nulla asperiores tenetur quas optio nam. Magni, omnis unde dolorem minus, fugit voluptatum, itaque culpa consectetur quaerat animi dolore explicabo corrupti totam eveniet quisquam nulla! Maiores necessitatibus, amet illo impedit, dolorem velit, odit neque nihil quo tempore pariatur. Dignissimos, veniam? Suscipit quasi minus atque odio itaque. Aliquid ullam incidunt dolorum fuga numquam quo animi accusamus architecto cumque molestias hic voluptatibus culpa illum laborum earum laboriosam eaque, vero dicta sunt itaque neque voluptates vitae dignissimos eligendi! Facilis corporis cum quisquam dignissimos a quis blanditiis natus, assumenda obcaecati, dolorum nostrum accusamus pariatur molestias aperiam reiciendis culpa repudiandae facere, hic voluptate consectetur inventore expedita nam quae eum. Facilis tempore quo voluptatibus beatae? Non accusamus numquam maiores inventore cumque voluptatum. Facilis culpa explicabo accusamus officia nulla ad est eligendi necessitatibus ea recusandae quisquam assumenda veritatis voluptatibus libero, quis ab alias repudiandae autem et ducimus unde soluta officiis reiciendis! Quo tempora a consequuntur, repellat dignissimos quaerat. Inventore exercitationem perspiciatis quas animi voluptas minima asperiores corporis, eos blanditiis officia reprehenderit atque est modi et consequuntur quasi iure dolorem culpa neque ab rem qui debitis, delectus voluptatibus? Recusandae mollitia doloremque earum quis quasi eligendi distinctio tempora architecto pariatur dolore voluptas sint corrupti perferendis, rem placeat! Dignissimos placeat facilis quidem ea delectus cupiditate laudantium!"
            isVerified={isVerified}
            setVerified={setVerified}
            verDate="2 minutes ago"
            isFav={isFav}
            setFav={setFav}
            favDate="3 days ago"
            likes="10"
          />
        </Tabs.Item>

        <Tabs.Item title="Information" icon={HiAdjustments}>
          This is
          <span className="font-medium text-gray-800 dark:text-white">
            Settings tab&apos;s associated content
          </span>
          . Clicking another tab will toggle the visibility of this one for the
          next. The tab JavaScript swaps classes to control the content
          visibility and styling.
        </Tabs.Item>
        <Tabs.Item title="Comments" icon={IoStarSharp}>
          This is
          <span className="font-medium text-gray-800 dark:text-white">
            Contacts tab&apos;s associated content
          </span>
          . Clicking another tab will toggle the visibility of this one for the
          next. The tab JavaScript swaps classes to control the content
          visibility and styling.
        </Tabs.Item>
      </Tabs>
    </div>
  );
}

export default Paper;
