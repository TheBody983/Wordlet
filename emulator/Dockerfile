# Dockerfile de l'émulateur

FROM debian:latest

WORKDIR /emulator

ENV PATH /emulator/node_modules/.bin:$PATH

COPY . ./

RUN apt update -y && apt install -y curl

EXPOSE 8080
EXPOSE 3000
EXPOSE 2000
RUN sh -ci "$(curl -fsSL https://storage.googleapis.com/flow-cli/install.sh)"
ENV PATH $PATH:/root/.local/bin

CMD ["flow", "emulator"]