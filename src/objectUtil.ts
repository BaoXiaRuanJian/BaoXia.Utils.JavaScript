
export class ObjectUtil
{
    ////////////////////////////////////////////////
    // @类方法
    ////////////////////////////////////////////////

    /**
     * 判断指定的对象是否为“undefined”或“null”。
     * @param obj 指定的对象。
     * @returns 指定的对象是否为“undefined”或“null”时，返回：true，否则返回：false。 
     */
    static isUndefinedOrNull(obj: any | null): boolean
    {
        if (typeof (obj) == "undefined"
            || obj == null)
        {
            return true;
        }
        return false;
    }

    /**
     * 判断指定的对象是否不为“undefined”或“null”。
     * @param obj 指定的对象。
     * @returns 指定的对象是否不为“undefined”或“null”时，返回：true，否则返回：false。
     */
    static isNotUndefinedOrNull(obj: any | null): boolean
    {
        return ObjectUtil.isUndefinedOrNull(obj) == false;
    }

    /**
     * 判断指定的对象是否不为“undefined”或“null”。
     * @param obj 指定的对象。
     * @returns 指定的对象是否不为“undefined”或“null”时，返回：true，否则返回：false。
     */
    static isValid(obj: any | null): boolean
    {
        return ObjectUtil.isNotUndefinedOrNull(obj);
    }
        /**
     * 判断指定的对象是否为“undefined”或“null”。
     * @param obj 指定的对象。
     * @returns 指定的对象是否为“undefined”或“null”时，返回：true，否则返回：false。 
     */
    static isInvalid(obj: any | null): boolean
    {
        return ObjectUtil.isUndefinedOrNull(obj);
    }
}