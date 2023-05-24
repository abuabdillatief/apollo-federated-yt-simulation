.PHONY: rmq

rmq:
	@docker pull rabbitmq
	@docker run --rm -it -p 5672:5672 --name rabbitmq rabbitmq
