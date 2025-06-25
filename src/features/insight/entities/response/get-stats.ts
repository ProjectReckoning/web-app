export interface GetStatsResponse {
  ok: boolean;
  data: GetStatsResponseItem[];
  message: string;
  code: number;
}

export interface GetStatsResponseItem {
  x: string[];
  label: string;
  series: Series;
}

interface Series {
  [key: string]: SeriesDetail;
}

interface SeriesDetail {
  data: number[];
  color: string;
}