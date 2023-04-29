import { TestCase } from "./testCase.js";

export class TestProject
{
    ////////////////////////////////////////////////
    // @自身属性
    ////////////////////////////////////////////////

    name: string;
    testCases: TestCase[];


    ////////////////////////////////////////////////
    // @自身实现
    ////////////////////////////////////////////////

    constructor(
        name: string,
        testCases: TestCase[])
    {
        this.name = name;
        this.testCases = testCases;
    }

    test()
    {
        try
        {
            let testCases = this.testCases;
            let testCasesCount = testCases.length;
            console.log("测试开始，共 " + testCasesCount + " 个用例待进行。");

            let testCasesCountWithTestSuccess = 0;
            let testCasesCountWithTestFailed = 0;

            for (let testCaseIndex = 0;
                testCaseIndex < testCasesCount;
                testCaseIndex++)
            {
                let testCase = testCases[testCaseIndex];
                let testCaseNumber = testCaseIndex + 1;
                let testProgressCaption = testCaseNumber + "/" + testCasesCount;
                let testCaseNameCaption = "第 " + testProgressCaption + " 个用例，" + testCase.name;
                console.log("\r\n" + testCaseNameCaption + "，测试开始...");
                let testException = null;
                {
                    testException = testCase.test();
                    if (testException == null)
                    {
                        testCasesCountWithTestSuccess++;
                    }
                    else
                    {
                        testCasesCountWithTestFailed++;
                    }
                }
                let testResult: string;
                if (testException != null)
                {
                    testResult = "❌\t" + testCase.name + "，未通过测试：\r\n" + testException;
                }
                else
                {
                    testResult = "✔\t" + testCase.name + "，通过测试。";
                }
                console.log(testResult);
            }
            if (testCasesCountWithTestFailed > 0)
            {
                console.log("\r\n💣💣💣\t" + this.name + "，未通过测试，共 " + testCasesCountWithTestFailed + "/" + testCasesCount + " 个用例，未通过测试。\r\n");
            }
            else
            {
                console.log("\r\n🎉🎉🎉\t" + this.name + "，通过测试，共 " + testCasesCount + " 个用例，全部通过测试！\r\n");
            }
        }
        catch (exception)
        {
            console.error("\r\n💣💣💣\t" + this.name + "，未通过测试，测试项目程序异常：\r\n" + exception + "\r\n");
        }
    }
}