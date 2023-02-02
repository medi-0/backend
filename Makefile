.DEFAULT_GOAL 	:= help
.PHONY: compile run run-cli test coverage clients logs all gomod_tidy go_fmt help


# Commands
echo: # echo
	@echo hello
build: # runs build 
	@aws ecr get-login-password --region ap-southeast-1 | docker login --username AWS --password-stdin 388450347861.dkr.ecr.ap-southeast-1.amazonaws.com
	@docker build -t medi0 .
	@docker tag medi0:latest 388450347861.dkr.ecr.ap-southeast-1.amazonaws.com/medi0:latest
	@docker push 388450347861.dkr.ecr.ap-southeast-1.amazonaws.com/medi0:latest

buildaws: # runs build and push to dockerhub
	@docker build --platform linux/amd64 -t 0xkeivin/pubrepo:latest . 
	@docker push 0xkeivin/pubrepo:latest

runaws: # runs docker from aws container
	@docker run -p 80:5001 0xkeivin/pubrepo:latest

buildlocal: # runs build and push to dockerhub
	@docker build -t medi0 .
runlocal: # runs docker locally
	@docker run -p 80:5001 medi0

help: ## Show this help
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
