## svn

---

svn을 이용한 형상관리에 대해 알아보자.

먼저 사용법부터.

# 설치

설치는 당연히 서버에 해야 한다.

centos 에서는

```bash
yum install svn -y
```

로 간단하게 설치할 수 있다.

각자 서버에 맞게 알아서들 하자.

# repository 생성

어떤 형상관리시스템을 사용하든지 제일 먼저 repository를 생성해 줘야 한다.

각 개발자가 접속해서 커밋을 하든, 소스를 가져가든 하려면 작업 공간이 있어야 할테니까.

먼저 리파지토리들을 보관한 디렉토리를 먼저 생성하자.

예제는 /usr/local 디렉토리 아래에 만들어본다.

```bash
mkdir /usr/local/svn-repo
```

이제 생성한 리파지토리 디렉토리 내부에 새로운 리파지토리를 만든다.

```bash
cd /usr/local/svn-repo

svnadmin create --fs-type fsfs new-project

ls
```

일단은 이걸로 new-project 라는 이름의 리파지토리가 만들어졌다.

ls 결과로 방금 만든 new-project 라는 디렉토리가 생겼을꺼다.

이제 네트웍을 통해 다른 서버 또는 개발자들이 접속할 수 있도록 서빙을 해줘야 한다.

svn 서버는 기본값 3690 포트를 이용하니 이것도 참고하자.

```bash
svnserve -d -r /usr/local/svn-repo --log-file /var/log/svnserve.log

netstat -l
```

svn 서버 실행후 netstat로 확인 한 결과는 아마 아래와 비슷할 것이다.

Active Internet connections (only servers)
Proto Recv-Q Send-Q Local Address           Foreign Address         State
tcp        0      0 0.0.0.0\:http            0.0.0.0:*               LISTEN
tcp        0      0 **0.0.0.0\:svn**             0.0.0.0:*               LISTEN

# 사용

이제 서버도 준비됐고, 실제 작업을 해보자

svn 서버가 떠있는 서버에서 해도 되지만, 보안을 위해 실제 working-copy는 다른 서버에서 하는게 좋다.

같은 서버에서 하든 다른 서버에서 하든 하는 일은 같다.

우선 프로젝트 파일을 저장할 위치에 디렉토리를 만들자.

이미 프로젝트를 어느 정도 진행해서 파일이 있다면 패스

```bash
mkdir -p /data/project/new-project

cd /data/project/new-project
```

이제 여기서 svn 서버의 리파지토리를 연결하고 작업을 시작한다.

```bash
pwd

# /data/project/new-project

svn checkout svn://172.17.0.3/new-project .
```

테스트를 해보자

```bash
pwd

# /data/project/new-project

vi readme

# 내용은 아무거나 입력하고 저장

svn add readme
svn commit readme --message "first commit test"
```

이렇게 실행하면 아마 **Authorization failed** 이런 에러가 나올꺼다.

svn 서버는 기본적으로 read 권한은 아무나, write 권한은 인증자에게 주고 있기 때문이다.

이걸 수정하자

```bash
vi /usr/local/svn-repo/new-project/conf/svnserve.conf

# 내용중에 이런 줄이 보일꺼다. 19라인 정도에
# anon-access = read
# auth-access = write

# 주석처리된걸 풀어주고
# 일단 둘다 write로 바꾸고 저장해보자
anon-access = write
auth-access = write
```

이렇게 프로젝트의 설정을 변경후 다시 위에서 했던 커밋 명령을 날려보자

```bash
pwd

# /data/project/new-project

svn commit readme --message "first commit test"
```

이번에는 정상적으로 실행된걸 볼 수 있다.

하지만 이대로 사용하면 누구나 이 프로젝트 소스를 읽고 쓸수 있으니 엉망진창이 된다.

사용자 설정을 해보자

먼저 이전에 모두에게 write 권한을 줬던걸 권한 없는 사용자는 none 으로 바꿔줘본다.

```bash
vi /usr/local/svn-repo/new-project/conf/svnserve.conf

anon-access = none
auth-access = write

# 그리고 조금 아래를 보면 이런 내용이 있을거다.
# 유저 아이디 패스워드를 저장한 파일의 위치 설정이다.
# 이부분 주석 처리를 해제해주자
# password-db = passwd

# 변경 후
password-db = passwd
```

이제 아무나는 아무것도 할 수 없게 만들었으니 user를 만들어주자.

```bash
vi /usr/local/svn-repo/new-project/conf/passwd

# 이런 내용이 이미 있을거다.
# 그냥 딱 봐도 "아이디 = 패스워드" 라는 감이 온다.
# 원래 있던건 놔두고 맨 아래에 추가로 테스트 계정을 넣어준다
[users]
# harry = harryssecret
# sally = sallyssecret

# 변경 후
[users]
# harry = harryssecret
# sally = sallyssecret
user1 = password1
```

두가지 설정 변경 후 이전에 만들었던 readme 파일에 아무 내용이나 넣어서 수정을 해준다.

그리고 다시 커밋을 해보자. (add는 안해도 된다. 이미 해줬으니까.)

```bash
pwd

# /data/project/new-project

svn commit readme --message "second commit test"
```

그러면 이런 에러를 볼수 있을거다.

**No access allowed to this repository**

권한이 없어서 사용이 불가능하다는 말이다.

그러면 커밋을 하는 사용자가 누군지 알려주면 된다.

이렇게 실행해보자

```bash
pwd

# /data/project/new-project

svn commit readme --message "second commit test" --username user1 --password password1
```

아마 잘 될꺼다.

물론 이대로 놔두면 계정 정보가 너무 평문으로 저장돼있어서 위험하다고 판단할 수 있지만, 딱히 그렇지도 않은게

유저 설정 파일 자체가 svn 서버에, 각 리파지토리 안에 있다.

유저 설정 파일을 볼 수 있는 정도로 서버에 들어왔다면, 이미 끝장난 상태라고 봐도 무방하다.

그래도 거슬린다면 sasl 암호화라는걸 사용해서 사용자를 지정해도 되니, 필요하다면 sasl을 통해 사용자 설정하는 법을 찾아봐라.

# 협엽을 위한 사용

보통 여러명이 하나의 프로젝트를 진행하게 되면 서로 소스가 꼬일 수 있고, 다른 사람의 작업에 방해를 할 수도 있으니 각자의 공간을 따로 할당해주는 방식으로 진행한다.

그러러면 먼저 각자의 공간을 할당할 수 있는 루트 공간이 있어야 하는데, 이때 svn 에서는 아래와 같은 디렉토리 구성을 권장하고 있다.

ㅡ repository-directory
    |- trunk
    |- branches
    |- tags

권장하는 대로 만들어서 사용해도 되고, 맘대로 바꿔서 사용해도 된다. 하지만, 맘대로 바꾸면 이용하는 개발자들한테 뭘로 바꿨는지 알려줘야 하니 귀찮다.

어쨌든 권장 사항대로 만들어보자

```bash
svn mkdir svn://172.17.0.3/new-project/trunk --username user1 --password password1 --message "new trunk"
svn mkdir svn://172.17.0.3/new-project/branches --username user1 --password password1 --message "new branches"
svn mkdir svn://172.17.0.3/new-project/tags --username user1 --password password1 --message "new tags"
```

이 명령어들을 실행하고 나면 리파지토리쪽에 세개의 디렉토리가 생기는데, 이중에 우리는 trunk를 메인 소스를 두는 공간으로 사용한다.

branches에는 개별적으로 작업자들이 본인들의 작업 공간을 만들어줄수 있도록 하겠다.

먼저 메인 소스쪽부터 처리해보자

아까 만들었던 /data/project/new-project 에는 이미 우리가 만들었던 readme 파일이 있고, checkout도 돼있는 상태이기 때문에 일단 checkout을 없애보자

/data/project/new-project 안에는 .svn 이라는 디렉토리가 추가됐을 것인데, 이 디렉토리를 삭제하면 된다.

```bash
rm -rf /data/project/new-project/.svn
```

체크아웃은 없앴지만 소스는 유지하고 싶다.

그러니 원래 있던 소스를 trunk에 넣어주도록 하자

```bash
svn import /data/project/new-project svn://172.17.0.3/new-project/trunk --username user1 --password password1 --message "first import"
```

리파지토리에 있던 소스는 밀어넣었으니 갖고 있던 소스는 필요없다.

혹시 모르니까 디렉토리 이름만 변경해서 백업해놓고 새로 체크아웃하자.

```bash
pwd

# /data/project

mv /data/project/new-project /data/project/new-project-temp

svn checkout svn://172.17.0.3/new-project/trunk /data/project/new-project --username user1 --password password1
```

원래 사용하던 디렉토리 이름으로 디렉토리가 만들어지면서 체크아웃이 완료될거다.

그럼 이번엔 다른 작업자의 사용을 위한 준비를 하자

먼저 사용자 등록부터

```bash
vi /usr/local/svn-repo/new-project/conf/passwd

# 이런 내용이 이미 있을거다.
# 그냥 딱 봐도 "아이디 = 패스워드" 라는 감이 온다.
# 원래 있던건 놔두고 맨 아래에 추가로 계정을 넣어준다
[users]
# harry = harryssecret
# sally = sallyssecret

# 변경 후
[users]
# harry = harryssecret
# sally = sallyssecret
user1 = password1
user2 = password2
```

아까 했던 사용자 계정 등록이다. user2를 추가했다.

지금 설정대로라면 누구나 branch를 추가할 수 있고, trunk도 마음대로 이용할 수 있다.

그래서 추가적인 권한 설정을 해주도록 하겠다.

```bash
vi /usr/local/svn-repo/new-project/conf/authz

# 파일을 열어보면 뭔가 많이 있을텐데 다 무시하고 맨 아래에 아래 내용을 추가해보자
# 리파지토리의 루트, 즉 svn://172.17.0.3/new-project/ 는 로그인만 한다면 누구나 볼 수만 있게 한다.
[/]
$authenticated =r

# svn://172.17.0.3/new-project/trunk 경로는 이 프로젝트의 관리자인 user1만 쓰기 권한이 있고, 나머지는 읽기 권한만 준다.
[/trunk]
user1 = rw
$authenticated = r

# svn://172.17.0.3/new-project/branches 경로는 누구나 쓰기 권한을 준다.
[/branches]
$authenticated = rw

# svn://172.17.0.3/new-project/tags 경로도 누구나 쓰기 권한을 준다.
[/tags]
$authenticated = rw
```

이렇게 수정하고 이 설정을 리파지토리에서 사용하도록 추가 설정을 하자

```bash
vi /usr/local/svn-repo/new-project/conf/svnserve.conf

# 위에서 언젠가 사용자 아이디-패스워드 파일을 지정할 때 사용했던 파일이다.
# 34라인쯤에 이런 내용이 있을 것이다.
# authz-db = authz

# 주석을 해제해주자.
authz-db = authz
```

저장 후 테스르를 해보자

이번에는 관리자 유저가 아닌 user2로 진행해본다.

```bash
svn checkout svn://172.17.0.3/new-project/trunk /data/project/user2project --username user2 --password password2

svn copy svn://172.17.0.3/new-project/trunk svn://172.17.0.3/new-project/branches/user222 --username user2 --password password2 -m "new branche for user2"

cd /data/project/user2project

svn switch svn://172.17.0.3/new-project/branches/user222 --username user2 --password password2
```

이렇게 user2의 작업공간이 별도로 만들어졌다.

user2에서 이제 뭔가 변경을 하고 커밋을 해도 원본인 trunk에는 변경이 없다.

마지막으로 user2의 작업본을 trunk에 반영하는 작업을 해보자.

```bash
# 반영 작업을 할때는 버젼을 맞추기 위해서 반드시 update를 한번 해준다.
svn up --username user1 --password password1

svn merge svn://172.17.0.3/new-project/branches/user222 --username user1 --password password1

# 실행결과
# --- Merging r36 through r37 into '.':
# U    readme
# --- Recording mergeinfo for merge of r36 through r37 into '.':
# U   .
```

위처럼 실행이 잘 돼서 완료됐다면 끝이고, 뭔가 conflict가 생겨 문제가 있다면 merge 실행자가 해결해야 하는 문제다.

보통은 이렇게 사용자별로는 하지 않고 기능별 또는 기획별로 브랜치를 추가하고 관련된 개발자가 해당 브랜치를 가져와서 작업하고 반영하는 방식을 많이 사용한다.

# 실제 개발자는

지금까지 계속 command로 작업하는 것만 말했는데,

서버 설정 외에 나머지 것들은 실제 작업하는 사람의 영역이기 때문에 윈도우 프로그램을 이용하는게 훨씬 편하고 좋다.

https://tortoisesvn.net/downloads.html

일단은 svn 클라이언트 프로그램을 설치한다.

이때 중요한 내용이 있는데, 설치중에 설치할 항목을 선택하는 화면이 나온다.

![](https://i.ibb.co/3f7s0wz/2024-03-10-133158-png.png)

이렇게 x표시되어서 설치되지 않는 항목이 있는데, 이 항목은 command line 기능이다.

이 항목이 우리에게는 꼭 필요하다.

![](https://i.ibb.co/8NsFWY6/2024-03-10-133232-png.png)

그래서 반드시 이렇게 전체 설치되도록 변경해줘야 한다.

svn 클라이언트를 설치하고 나면 탐색기에서 svn 기능을 사용할 수 있게 되지만 추가로 많이들 사용하는 vscode의 확장 기능도 설치해준다.

![](https://i.ibb.co/j82H8jL/2024-03-10-133839-png.png)

extension market에서 svn으로 검색했을때 첫번째로 나오는 이녀석이다.

설치하고 체크아웃된 폴더를 vscode에서 오픈하면

![](https://i.ibb.co/2dYF1xS/2024-03-10-134050-png.png)

소스제어탭에서 이런 화면을 볼 수 있다.

현재 어떤 브랜치에서 작업중인지도 나오고 명령 실행도 여기서 그냥 할 수 있고, 가장 좋은 점은 trunk에 merge할때 conflict된 경우의 수정이 너무 편해서 좋다.

일단은 여기까지만 해보자.

