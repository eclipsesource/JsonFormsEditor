module app {
    export class Profiler {

        watching:any = [];

        static profiler: Profiler;

        static getInstance():Profiler{
            if(!this.profiler){
                this.profiler = new Profiler();
            }

            return this.profiler;
        }

        watch(ident:string, report:any){
            this.watching[ident] = {
                report: report,
                startTime: 0
            };

        }

        startMeasure(ident:string){
            if(this.watching[ident]){
                this.watching[ident].startTime = performance.now();
            }
        }

        endMeasure(ident:string){
            if(this.watching[ident]){
                var timeNow = performance.now();
                var timeTaken = timeNow - this.watching[ident].startTime;

                this.watching[ident].report(timeTaken);
            }
        }
    }
}