import { AssignmentBar } from "@/components/AssignmentBar";
import { Chart } from "@/components/Chart";
import { DailyTasks } from "@/components/DailyTasks";
import { Header } from "@/components/Header";
import { ProfileImage } from "@/components/ProfileImage";
import { AddButton } from "@/components/AddButton";
import NewModal from "@/components/modals/NewModal";
import { getCurrentUser } from "@/lib/actions";
import { Calendar } from "@/components/Calendar";

export default async function Dashboard() {

  const user = await getCurrentUser()
  return (
    <section className="w-full min-h-screen p-4 space-y-4 flex flex-col">
      <Header />
      <ProfileImage />
      <h1 className="font-bold text-3xl">Dashboard</h1>
      <section className="self-center max-w-[550px] lg:max-w-[800px] xl:max-w-[1000px] w-full">
        <AssignmentBar />
      </section>
      <div className="relative self-center max-w-[1000px] flex-grow w-full h-max flex flex-col items-center justify-center gap-4">
      <AddButton />
        <section className="flex flex-wrap w-full gap-4"> 
        <DailyTasks />
        <Chart />
        <Calendar/>
        </section>
      </div>
      <NewModal username={user?.name!} />
    </section>
  );
}
