.PHONY: rmq users videos simualtion history gateway

rmq:
	@docker pull rabbitmq
	@docker run --rm -it -p 5672:5672 --name rabbitmq rabbitmq
users:
	@npm run start:dev users
videos:
	@npm run start:dev videos
simulation:
	@npm run start:dev simulation
history:
	@npm run start:dev history
gateway:
	@npm run start:dev