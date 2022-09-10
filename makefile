clear clean:
	@find . -name '.DS_Store' -exec rm {} +
	@find . -name '__pycache__' -exec rm -rf {} +
	@find . -name '.mypy_cache' -exec rm -rf {} +

start:
	@python3 main.py