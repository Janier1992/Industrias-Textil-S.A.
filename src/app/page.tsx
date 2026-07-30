import { HcmApp } from "@/components/hcm/HcmApp";
import { HcmProvider } from "@/store/HcmStore";

export default function Home() {
  return (
    <HcmProvider>
      <HcmApp />
    </HcmProvider>
  );
}
