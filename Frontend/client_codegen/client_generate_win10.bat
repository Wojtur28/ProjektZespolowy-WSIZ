java -jar openapi-generator-cli-3.3.4.jar generate   -i C:\Users\lkuzi\IdeaProjects\deva\devpage\src\main\resources\contract\contract.yaml  -c config.json -g typescript-angular   -o ..\tmp\client\


xcopy /e ..\tmp\client\model ..\src\app\client\model /Y
xcopy /e ..\tmp\client\api ..\src\app\client\api /Y

@DEL /s /q ..\tmp\client
