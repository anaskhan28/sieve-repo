import { cn } from "@/utils/cn";
import Marquee from "./ui/Marquee";
const category = [
{
    name: 'Frontend Development',
    circleColour: 'D8A953',
    background: 'F6F3F0',
    textColor: 'D8A953',

},
{
    name: 'Backend Development',
    circleColour: 'AB7FE6',
    background: 'F3F1FA',
    textColor: 'AB7FE6',

},
{
    name: 'Android Development',
    circleColour: '57CBD0',
    background: 'EEF6F8',
    textColor: '57CBD0',

},
{
    name: 'Data Structures',
    circleColour: '7F8FE9',
    background: 'F1F2FA',
    textColor: '7F8FE9',

},
{
    name: 'Machine Learning',
    circleColour: '6BAC65',
    background: 'ECF2EE',
    textColor: '6BAC65',

},
{
    name: 'Open Source',
    circleColour: 'F0793A',
    background: 'F9F1EE',
    textColor: 'F0793A',

},

];

const firstRow = category.slice(0, category.length / 2);
const secondRow = category.slice(category.length / 2);

const CategoryCard = ({
 
    circleColour,
    name,
    background,
    textColor,
 
}: {
  circleColour: string;
  name: string;
  background:string;
  textColor: string;


 
}) => {
    return (
        <div
          className={`relative w-72 cursor-pointer border p-4 rounded-xl`}
          style={{ backgroundColor: `#${background}` }}
        >
          <div className="flex flex-row justify-start items-center gap-3">
            <div className={`w-6 h-6 rounded-full flex justify-center items-center`}
                 style={{ backgroundColor: 'white' }}>
              <div className={`w-3 h-3 rounded-full`}
                   style={{ backgroundColor: `#${circleColour}` }}></div>
            </div>
            <div className={`text-xl font-bold`}
                 style={{ color: `#${textColor}` }}>{name}</div>
          </div>
        </div>
  );
};

const Categories = () => {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden  py-20 ">
      <Marquee pauseOnHover className="[--duration:20s]">
      {
        firstRow.map((category, i) =>(
            <CategoryCard key={category.name} {...category}/>
        ) )
      }
       
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:20s]">
      {
        secondRow.map((category, i) =>(
            <CategoryCard key={category.name} {...category}/>
        ) )
      }
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
    </div>
  );
};




export default Categories;