declare module '*.art' {
  export default function template(data?:any): any;
}
declare interface template {
  (data: any): string
}