import { Tasks } from "@/src/app/components/tasks/tasks";
import { Wrapper } from "@/src/app/components/utils/wrapper/wrapper";

export default function Dashboard() {
  return (
    <Wrapper>
      <main>
        <Tasks />
      </main>
    </Wrapper>
  );
}
