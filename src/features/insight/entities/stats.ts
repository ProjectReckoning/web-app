export interface StatsItem {
  x: string[];
  label: string;
  series: Series;
}

export interface Series {
  [key: string]: SeriesDetail;
}

export interface SeriesDetail {
  data: number[];
  color: string;
}