import prompts from 'prompts';

export const hostPrompt = async (): Promise<prompts.Answers<"host">> => {
  return await prompts({
    type: 'multiselect',
    name: 'host',
    message: 'Which of the following host metrics would you like to monitor?\n For more info visit: https://vector.dev/docs/reference/configuration/sources/host_metrics/\n',
    instructions: 'Press: Space to select one, A to select all, and Enter to submit.',
    choices: [
      {
        title: 'CPU',
        value: 'CPU',
        description: 'Count of CPU seconds accumulated in different operating modes'
      },
      {
        title: 'Disk',
        value: 'Disk',
        description: 'Count of read/write operations and how many bytes for each.'
      },
      {
        title: 'Filesystem',
        value: 'Filesystem',
        description: 'Count of free/total/used bytes on the filesystem.'
      },
      {
        title: 'Load',
        value: 'Load',
        description: 'System load averaged over the last 1/5/15 seconds.'
      },
      {
        title: 'Host',
        value: 'Host',
        description: 'Uptime/boot time.'
      },
      {
        title: 'Memory',
        value: 'Memory',
        description: 'Measure bytes of active/available/buffered/free/inactive memory, etc.'
      },
      {
        title: 'Network',
        value: 'Network',
        description: 'Measure total number of bytes/packets sent/received over the network or dropped.'
      },
    ],
  });
};
