/**
 * Created by hfq on 5/12/15.
 */
interface ObjectConstructor {
    assign(target: any, ...sources: any[]): any;
    observe(target: any, callback: Function, acceptList?: Array<any>): void;
}