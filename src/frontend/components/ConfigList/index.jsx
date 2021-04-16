import Configs from './Configs';

export default function ConfigsList() {
  // const dispatch = useDispatch();
  // const configurationsStatus = useSelector((state) => state.configurations.status);
  // const configurations = useSelector((state) => {
  //   return state.configurations.ids.map((id) => state.configurations.entities[id]);
  // });

  // useEffect(() => {
  //   if (configurationsStatus === 'idle') {
  //     dispatch(fetchConfigurations());
  //   }
  // }, [configurationsStatus, dispatch]);
  const configurations = [
    { state: 'closed' }, 
    { state: 'open' }, 
    { state: 'half' }
  ];

  return (
    <div>
      <h2 className="text-gray-500 text-xs font-medium uppercase tracking-wide">
          Services Protected by Campion
      </h2>

      <Configs items={configurations} />
    </div>
  );
}
