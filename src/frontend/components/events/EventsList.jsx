import React from "react";
import Events from "./Events";

export default function EventsList({ endpointId }) {
  // const dispatch = useDispatch();
  // const eventStatus = useSelector((state) => state.events.status);
  // let events = endpointId
  //   ? useSelector((state) => state.events.endpoints[endpointId])
  //   : useSelector(selectAllEvents);

  // useEffect(() => {
  //   if (eventStatus === "idle") {
  //     dispatch(fetchEvents());
  //   }
  // }, [eventStatus, dispatch]);
  let events;

  if (!events) events = [];

  return (
    <div className="flex flex-col">
      <div className="-my-2 sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Time
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Event
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Description
                  </th>
                </tr>
              </thead>
              <Events events={events} status={eventStatus} />
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
