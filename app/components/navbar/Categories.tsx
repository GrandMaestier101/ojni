import Container from "../Container";
import CategoryBox from "../CategoryBox";

import { FaReact } from "react-icons/fa"
import { SiAdobe, SiDotnet } from "react-icons/si"
import { RiChatSettingsLine } from "react-icons/ri"
import { usePathname, useSearchParams } from "next/navigation";
import { DiWebplatform } from "react-icons/di";
import { AiFillCloud, AiOutlineAreaChart } from "react-icons/ai";
import { BiJoystick, BiSupport } from "react-icons/bi";
import { GiAutoRepair } from "react-icons/gi";
import { TbNetwork } from "react-icons/tb";
import { BsDatabaseFillGear, BsStack } from "react-icons/bs";
import { IoHardwareChipSharp } from "react-icons/io5";
import { MdOutlineSecurity } from "react-icons/md";

interface IAppProps {
}

export const categories = [
    {
        label: "Full-stack developer",
        icon: FaReact,
        description: "React front end developer"
    },
    {
        label: "Graphic Designer",
        icon: SiAdobe,
        description: "Graphic designer familiar with Adobe Photoshop"
    },
    {
        label: "Social Media Manager",
        icon: RiChatSettingsLine,
        description: "Interacting with customers and dealing with customers' enquiries"
    },
    {
        label: "Web Development",
        icon: DiWebplatform,
        description: "Designing user interfaces and navigation menus. Writing and reviewing code for sites, typically HTML, XML, or JavaScrip"
    },
    {
        label: "Information security analyst",
        icon: MdOutlineSecurity,
        description: "An information security analyst is responsible for the security of an organization's computer systems and network"
    },
    {
        label: "Data Scientist",
        icon: AiOutlineAreaChart,
        description: "a proficient specialist who applies mathematical, problem-solving, and coding skills to manage big data, extracting valuable insights"
    },
    {
        label: "Game Developer",
        icon: BiJoystick,
        description: "C++ developers often work on both desktop and mobile applications, as well as software that interacts with low-level system and hardware resources"
    },
    {
        label: "System Designer",
        icon: GiAutoRepair,
        description: "design, integration, implementation, modification, and coordination of the installation, testing, operation, troubleshooting, and maintenance of hardware and software systems"
    },
    {
        label: "Network Administrator",
        icon: TbNetwork,
        description: "a proficient specialist who applies mathematical, problem-solving, and coding skills to manage big data, extracting valuable insights"
    },
    {
        label: "Full Stack Developer",
        icon: BsStack,
        description: "a proficient specialist who applies mathematical, problem-solving, and coding skills to manage big data, extracting valuable insights"
    },
    {
        label: "Cloud engineer",
        icon: AiFillCloud,
        description: "a proficient specialist who applies mathematical, problem-solving, and coding skills to manage big data, extracting valuable insights"
    },
    {
        label: ".NET Developer",
        icon: SiDotnet,
        description: "a proficient specialist who applies mathematical, problem-solving, and coding skills to manage big data, extracting valuable insights"
    },
    {
        label: "IT Support/Help-Desk",
        icon: BiSupport,
        description: "a proficient specialist who applies mathematical, problem-solving, and coding skills to manage big data, extracting valuable insights"
    },
    {
        label: "Database Administrator",
        icon: BsDatabaseFillGear,
        description: "a proficient specialist who applies mathematical, problem-solving, and coding skills to manage big data, extracting valuable insights"
    },
    {
        label: "Hardware Engineer",
        icon: IoHardwareChipSharp,
        description: "a proficient specialist who applies mathematical, problem-solving, and coding skills to manage big data, extracting valuable insights"
    },
]

const Categories = () => {
    const params = useSearchParams();
    const category = params?.get('category');
    const pathname = usePathname();

    const isMainPage = pathname == '/';

    if (!isMainPage) {
        return null;
    }

    return (
        <div>
            <Container>
                <div
                    className="
                    pt-4
                    flex
                    flex-row
                    items-center
                    justify-between
                    overflow-x-auto
                  "
                >
                    {categories.map((item) => (
                        < CategoryBox
                            key={item.label}
                            label={item.label}
                            selected={category == item.label}
                            icon={item.icon}
                        />
                    ))}
                </div>
            </Container>
        </div>
    );
};

export default Categories;
