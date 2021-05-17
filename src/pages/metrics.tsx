import ChartSwitcher from '../components/Services/ChartSwitcher';

interface Props {
  services: Record<string, string>[]
}

const Services = ({ services }: Props) => {
  if (services.length === 0) {
    return null;
  }

  return (
    <div className="px-2">
      {services.map(({ name }) => (
        <div className="py-4 px-4" key={name}>
          <ChartSwitcher name={name} />
        </div>
      ))}
    </div>
  );

};

export default Services;
