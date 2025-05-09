import type { Master } from "@/types/Master";
import { getMaster, updateMaster, updateMasterStatistic } from "@/api/masters";


interface MasterStatistic {
    aboutRequestCount?: number,
    requestCount?: number,
    shareCount?: number,
    postCount?: number,
    index?: number
}

export class MasterInteractor {
    public async getMasterById(documentId: string): Promise<Master> {
        const response = await getMaster(documentId);
        return response.data;
    }
    public async updateStatistic(master: Master,
        masterStatistic: MasterStatistic
    ) {
        const { aboutRequestCount, requestCount, shareCount, postCount, index } = masterStatistic;
        if (aboutRequestCount) {
            if (master.aboutRequestCount) master.aboutRequestCount =  master.aboutRequestCount++
            else master.aboutRequestCount = aboutRequestCount
        };
        console.log(master);
        

        const response = await updateMasterStatistic(master);
        return response.data;
    }
}