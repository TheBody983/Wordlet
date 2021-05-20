FROM debian:latest

WORKDIR /emulator

ENV PATH /emulator/node_modules/.bin:$PATH

COPY . ./

RUN apt update -y && apt install -y curl

EXPOSE 8080
RUN sh -ci "$(curl -fsSL https://storage.googleapis.com/flow-cli/install.sh)"
ENV PATH $PATH:/root/.local/bin

CMD ["flow", "emulator"]