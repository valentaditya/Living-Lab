export interface AgendaItem {
  id: string;
  month: string;
  day: string;
  tagLabel: string;
  tagColor: 'green' | 'orange' | 'blue';
  time: string;
  title: string;
  location: string;
  buttonText: string;
}