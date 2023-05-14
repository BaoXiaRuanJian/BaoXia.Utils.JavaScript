
import { NumberRoundType } from "./constant/numberRoundType.js";

export class NumberUtil
{
    ///////////////////////////////
    // @类方法
    ///////////////////////////////

    /**
     * 在指定的数值范围内，生成一个随机整数。
     * @param min 指定数值范围的最小值。
     * @param max 指定数值范围的最大值。
     * @returns 生成的随机整数。
     */
    public static randomInt(min: number, max: number): number
    {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    /**
     * 在指定的数值范围内，生成一个随机浮点数。
     * @param min 指定数值范围的最小值。
     * @param max 指定数值范围的最大值。
     * @returns 生成的随机浮点数。
     */
    public static randomFloat(min: number, max: number): number
    {
        return Math.random() * (max - min) + min;
    }

    /**
     * 根据指定的小数精度（位数），对指定的数值进行取整。
     * @param numberValue 指定的数值。
     * @param floatPrecision 指定的小数精度（位数）。
     * @param numberRoundType 指定的取整类型，默认为：NumberRoundType.Round，四舍五入。
     * @returns 取整后的数值。
     */
    public static numberByFixed(
        numberValue: number,
        floatPrecision: number,
        numberRoundType: NumberRoundType = NumberRoundType.Round): number
    {
        let pow = Math.pow(10, floatPrecision);

        switch (numberRoundType)
        {
            case NumberRoundType.Floor:
                {
                    return Math.floor(numberValue * pow) / pow;
                }
            case NumberRoundType.Ceil:
                {
                    return Math.ceil(numberValue * pow) / pow;
                }
            case NumberRoundType.Round:
            default:
                {
                    return Math.round(numberValue * pow) / pow;
                }
        }
    }
}