import ChartSwitcher from "../../components/Services/ChartSwitcher";
import { useRouter } from 'next/router';

const Services = () => {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <ChartSwitcher slug={slug} />
  );
};

export default Services;
