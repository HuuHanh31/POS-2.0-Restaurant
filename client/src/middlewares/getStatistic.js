import axios from 'axios';
export default function getStatistic(startDate,endDate) {
    try {
        const token = localStorage.getItem('TOKEN') || null;
        if (token) {
            let reqOptions = {
                url: `http://localhost:5000/admin/statistics?startTime=${startDate}&endTime=${endDate}`,
                params: { token },
                method: "GET",
            }
            return axios.request(reqOptions)
        }
        else return null;
    }
    catch (e) {
        console.log(e);
    }
}