java -jar openapi-generator-cli.jar generate   -i /Users/wojtur/IdeaProjects/ProjektZespolowy-WSIZ/Backend/src/main/resources/contract/contract.yaml  -c config.json -g typescript-angular   -o ../tmp/client/


cp -r ../tmp/client/model ../src/app/client
cp -r ../tmp/client/api ../src/app/client

rm -r ../tmp/client

