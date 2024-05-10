import StepperForm from "../components/StepperForm/StepperForm";
import jsonData from "../data/form.json";
import Layout from "../layout";

export default function Home() {
  return (
    <Layout>
      <StepperForm steps={jsonData.steps as any} />
    </Layout>
  );
}
