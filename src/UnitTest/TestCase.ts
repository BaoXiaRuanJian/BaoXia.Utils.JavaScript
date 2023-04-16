
import {AssertFailedError} from "./assertFailedError.js"

////////////////////////////////////////////////
// TestCase
////////////////////////////////////////////////
export class TestCase
{
    ////////////////////////////////////////////////
    // @自身属性
    ////////////////////////////////////////////////

    name:string;

    testRunable:(
        assert: (isTure: boolean) => any,
        assertFalse: (isTure: boolean) => any)
        => any;


    ////////////////////////////////////////////////
    // @类方法
    ////////////////////////////////////////////////

    /**
     * 断言指定的测试结果为“true”。
     * @param isTure 指定的测试结果。
     */
    static assertTrue(isTure: boolean)
    {
        if (isTure != true)
        {
            let assertFailedInfo = "验证失败：";
            {
                let error = new AssertFailedError();
            
                assertFailedInfo += error.stack;
            }
            throw assertFailedInfo;
        }
    }

    /**
     * 断言指定的测试结果为“false”。
     * @param isFalse 指定的测试结果。
     */
    static assertFalse(isFalse: boolean)
    {
        TestCase.assertTrue(!isFalse)
    }

    /**
     * 断言指定的测试结果为“true”。
     * @param isTure 指定的测试结果。
     */
    static assert(isTure: boolean): any
    {
        TestCase.assertTrue(isTure)
    }


    ////////////////////////////////////////////////
    // @私有方法
    ////////////////////////////////////////////////

    /**
     * 构建测试用例基本信息。
     * @param name 当前测试用例的名称。
     * @param runable 当前测试用例的测试内容。
     */
    constructor(
        name: string,
        testRunable: (
            assert: (isTure: boolean) => any,
            assertFalse: (isTure: boolean) => any)
            => any)
    {
        this.name = name;
        this.testRunable = testRunable;
    }

    test():boolean
    {
        try
        {
            console.error("用例“" + this.name + "”，开始测试：");
            {
                // !!!
                this.testRunable(TestCase.assert, TestCase.assertFalse);
                // !!!
            }
            console.error("✔\t用例“" + this.name + "”，测试成功。");
            return true;
        }
        catch (exception)
        {
            console.error("\t❌\t用例“" + this.name + "”，测试失败，错误信息：\r\n" + exception);
            return false;
        }
    }
}