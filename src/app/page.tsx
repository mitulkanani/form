import StepperForm from "@/components/StepperForm/StepperForm";
import jsonData from '../data/form.json'

export default function Home() {
  return (
    <div className=" ">
      <StepperForm steps={jsonData.steps as any} />
    </div>
  );
}
