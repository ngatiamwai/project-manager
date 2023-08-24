import http  from "k6/http";
import { sleep } from "k6";

export const options = {
    stages:[
        {duration: '2m', target:100},
        {duration: '4m', target:200},
        {duration: '6m', target:400},
        {duration: '8m', target:600},
        {duration: '10m', target:1000},
        {duration: '8m', target:800},
        {duration: '6m', target:600},
        {duration: '4m', target:400},
        {duration: '2m', target:200},
        {duration: '0m', target:100},
    ],
    threholds : {
        http_req_failed: ['rate < 0.01'],
        http_req_duration: ['p(90)<600', 'p(95)<700', 'p(99)<1500']
    }
}
export default ()=>{
    http.get('http://localhost:5000');
    sleep(1);  
}