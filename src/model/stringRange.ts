
/**
 * 字符串的区域信息。
 */
export class StringRange
{
    ////////////////////////////////////////////////
    // @自身属性
    ////////////////////////////////////////////////

    /**
     * 开始的字符索引值。
     */
    beginCharIndex: number

    /**
     * 结束的字符索引值。
     */
    get endCharIndex(): number
    {
        return this.beginCharIndex + this.charsCount;
    }

    /**
     * 结束的字符索引值。
     */
    set endCharIndex(endCharIndex: number)
    {
        this.charsCount = endCharIndex - this.beginCharIndex;
    }

    /**
     * 字符区域的长度。
     */
    charsCount: number


    ////////////////////////////////////////////////
    // @类方法
    ////////////////////////////////////////////////

    
    /**
     * 尝试使用连续字符串索引值的规则，压缩指定的区域数组。
     * @param ranges 要进行压缩的区域数组。
     * @returns 使用连续字符串索引值的规则，压缩后的区域数组。 
     */
    static tryCompressionRangesWithConsecutiveCharIndex(
        ranges: StringRange[]): StringRange[]
    {
        let rangeCompressed: StringRange[] = [];
        let lastRange: StringRange|null = null;
        for (let range of ranges)
        {
            if (lastRange == null)
            {
                lastRange = range;
                rangeCompressed.push(lastRange);
                continue;
            }
            if (!lastRange.tryAppendRangeWithConsecutiveCharIndex(range))
            {
                lastRange = range;
                rangeCompressed.push(lastRange);
            }
        }
        return rangeCompressed;
    }


    ////////////////////////////////////////////////
    // @自身实现
    ////////////////////////////////////////////////

    constructor(
        beginCharIndex: number = -1,
        charsCount: number = 0)
    {
        this.beginCharIndex = beginCharIndex;
        this.charsCount = charsCount;
    }

    /**
     * 尝试将另一个区域加入到当前区域中，如果另一个区域的起始字符索引值刚好等于当前区域的结束字符索引值，则加入成功，当前区域的字符个数增加另一个区域的字符个数。
     * @param anotherRange 要尝试加入的另一个字符串区域。
     * @returns 如果另一个区域的起始字符索引值刚好等于当前区域的结束字符索引值，则加入成功，返回：true，当前区域的字符个数增加另一个区域的字符个数，否则返回：false。
     */
    tryAppendRangeWithConsecutiveCharIndex(anotherRange: StringRange): boolean
    {
        if (this.endCharIndex == anotherRange.beginCharIndex)
        {
            // !!!
            this.charsCount += anotherRange.charsCount;
            // !!!
            return true;
        }
        return false;
    }
}