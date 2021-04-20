import Link from 'next/link';
import { useRouter } from 'next/router';
import { MonitoredService } from '../../constants/frontendTypes';

interface Props {
  service: MonitoredService;
  active: string;
  inactive: string;
}

export default function Service({ service, active, inactive }: Props) {
  const router = useRouter();
  const { slug } = router.query;

  const name = service.name.split("-")
    .map((i) => i[0].toUpperCase() + i.slice(1))
    .join(" ");

  return (
    <Link
      href={`/services/${service.name}`}
    >
      <a className={slug === `${service.name}` ? active : inactive}>
        <svg className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        {name}
      </a>
    </Link>
  );
}
