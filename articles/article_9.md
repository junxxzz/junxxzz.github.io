## kafka

---

카프카는 메세지 형태로 된 데이터 스트림을 실시간으로 구독, 게시할 수 있도록 해주는 메세지 브로커, 쉽게 말해서 통합관리형 메세지 서버라고 할 수 있다.

카프카는 여러개의 클러스터를 생성할 수 있고, 여러개의 replication서버를 둘 수 있고, 여러개의 토픽을 생성할 수 있다.

그리고, 메세지 스트림을 fifo의 스택 방식으로 뿌려주니 데이터 흐름을 알기 쉽다. 그래서 이벤트 서버로 사용하기도 하는 것 같다.

서비스마다 endpoint to endpoint 방식으로 사용하던 데이터 파이프라인을 카프라 서버를 사용함으로써 일괄적으로 endpoint to kafka 형태로 사용하니 구조가 심플해져서 좋다.

사실, 규모가 쪼금이라도 커진 회사에서는 모든 서비스의 로그를 취합하는 서버를 운영하기 마련이다.

각 서비스의 서버에서 각자 로그를 관리하기란 보통 어려운 일이 아니기도 하고, 서비스마다 사용하는 개발 언어도 다르고, 플랫폼도 다르고, 로그의 형태마저 다르다면 관리자 입장에서 이건 지옥이다.

나도 얼마전 golang을 사용한 로그서버를 따로 만들어서 중앙관리형 로그서버를 만들기는 했는데, 내가 만든 서버는 그저 메세지를 취합만 하는 방식이기 때문에, 카프카의 실시간 이벤트 스트림을 사용할 수 있다는 점이 상당히 매력적으로 느껴진다.

나중에 혹시나 써먹을지도 모르니, 카프카 공홈의 quick start 내용을 정리해둔다.

*아래 내용은 도커에서 alpine을 로드해서 테스트했다.*

*아래 예제에서는 카프카 서빙을 9092 포트로 진행하고 있으니 도커에서 진행할 경우 9092 포트 오픈을 해준다*

1. kafka 다운로드

https://archive.apache.org/dist/kafka/3.6.1/kafka_2.13-3.6.1.tgz

```bash
$ wget https://archive.apache.org/dist/kafka/3.6.1/kafka_2.13-3.6.1.tgz
$ tar -xzf kafka_2.13-3.6.1.tgz
$ cd kafka_2.13-3.6.1
```

2. kafka 환경설정

***서버에 자바와 bash가 설치돼 있어야 한다.***

> apk add openjdk17 bash

- zookeeper 를 이용하는 경우

```bash
# Start the ZooKeeper service
$ bin/zookeeper-server-start.sh config/zookeeper.properties
```

터미널을 하나더 열어서 카프카 브로커 서비스를 시작해준다.

```bash
# Start the Kafka broker service
$ bin/kafka-server-start.sh config/server.properties
```

- KRaft 를 이용하는 경우

Cluster UUID를 만들어준다.

```bash
$ KAFKA_CLUSTER_ID="$(bin/kafka-storage.sh random-uuid)"
```

로그 지정을 해준다.

```bash
$ bin/kafka-storage.sh format -t $KAFKA_CLUSTER_ID -c config/kraft/server.properties
```

카프카 브로커 서비스를 시작해준다.

```bash
$ bin/kafka-server-start.sh config/kraft/server.properties
```

3. topic 생성을 해준다.

```bash
$ bin/kafka-topics.sh --create --topic quickstart-events --bootstrap-server localhost:9092
```

topic 상태 확인

```bash
$ bin/kafka-topics.sh --describe --topic quickstart-events --bootstrap-server localhost:9092
Topic: quickstart-events        TopicId: NPmZHyhbR9y00wMglMH2sg PartitionCount: 1       ReplicationFactor: 1	Configs:
    Topic: quickstart-events Partition: 0    Leader: 0   Replicas: 0 Isr: 0
```

4. 콘솔을 통해 topic에 이벤트 메세지 작성해보기

```bash
$ bin/kafka-console-producer.sh --topic quickstart-events --bootstrap-server localhost:9092
This is my first event
This is my second event
```

5. 콘솔을 통해 이벤트 메세지 읽어오기

```bash
$ bin/kafka-console-consumer.sh --topic quickstart-events --from-beginning --bootstrap-server localhost:9092
This is my first event
This is my second event
```

6. 파일을 이용하는 topic 생성 및 서버 구동하기

***4.에서 구동시킨 console-produdcer와 별개로 실행되는 서버라서 4.와 5.는 종료해도 된다.***
***topic이름과 사용할 파일명은 config/connect-file-source.properties, config/connect-file-sink.properties 이 두개 파일에 지정돼있다.***

> **config/connect-file-source.properties**
> file=test.txt
> topic=connect-test

> **config/connect-file-sink.properties**
> file=test.sink.txt
> topics=connect-test

```bash
$ echo "plugin.path=libs/connect-file-3.6.1.jar" >> config/connect-standalone.properties
$ bin/connect-standalone.sh config/connect-standalone.properties config/connect-file-source.properties config/connect-file-sink.properties
```

7. 확인을 위해 console-consumer를 띄워준다

```bash
$ bin/kafka-console-consumer.sh --bootstrap-server localhost:9092 --topic connect-test --from-beginning
```

8. 이벤트 메세지 소스 파일에 직접 내용을 넣어본다.

```bash
$ echo "test" >> test.txt
```
