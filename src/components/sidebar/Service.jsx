import Link from 'next/link';

export default function Service({
  endpointId,
  name,
  search,
  active,
  inactive,
}) {
  return (
    <Link
      href={`/endpoints/?id=${endpointId}`}
      className={search === `?id=${endpointId}` ? active : inactive}
    >
      <svg className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      {name}
    </Link>
  );
}
