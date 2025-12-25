# BULC Building Designer

<p align="center">
  <img src="icon.png" alt="BULC Logo" width="200"/>
</p>

<p align="center">
  <strong>AI-powered building design automation for Claude Desktop</strong>
</p>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#installation">Installation</a> •
  <a href="#usage">Usage</a> •
  <a href="#examples">Examples</a> •
  <a href="#privacy-policy">Privacy</a>
</p>

---

## Overview

BULC Building Designer is a Model Context Protocol (MCP) server that connects Claude Desktop to the BULC fire simulation software. It enables natural language building design - simply describe what you want, and Claude will create rooms, walls, and multi-story structures automatically.

## Features

- **Natural Language Design**: Create buildings by describing them in plain language
- **Room Creation**: Rectangular and polygon-shaped rooms
- **Wall Management**: Individual walls or rectangular enclosures
- **Multi-Level Support**: Design multi-story buildings with ease
- **Spatial Awareness**: AI understands relative positions ("next to the living room")
- **Undo/Redo**: Full support for undoing and redoing operations
- **Bilingual**: Works in English and Korean

## Installation

### Prerequisites

1. **BULC Application**: Download from [Meteor Simulation]([https://www.msimul.com]
2. **Node.js**: Version 16.0.0 or higher
3. **Claude Desktop**: Latest version

### Setup

1. Clone this repository:
```bash
git clone https://github.com/meteor-simulation/bulc-mcp-server.git
cd bulc-mcp-server
```

2. Install dependencies:
```bash
npm install
```

3. Build the server:
```bash
npm run build
```

4. Configure Claude Desktop:

Add to your `claude_desktop_config.json`:

**Windows**: `%APPDATA%\Claude\claude_desktop_config.json`
**macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "bulc": {
      "command": "node",
      "args": ["<path-to-repo>/build/index.js"],
      "env": {
        "BULC_PORT": "19840"
      }
    }
  }
}
```

5. Restart Claude Desktop

## Usage

1. **Start BULC Application** first
   - You should see `[BULC-MCP] Server started on port 19840` in the console

2. **Open Claude Desktop**
   - The MCP server will connect automatically

3. **Start Designing**
   - Ask Claude to create rooms, walls, and buildings

## Examples

### Example 1: Create a Simple Room

```
Create a 5m x 4m living room
```

Claude will:
1. Convert 5m x 4m to 500cm x 400cm
2. Create a room at position (0, 0)
3. Name it "Living Room"

### Example 2: Add an Adjacent Room

```
Add a 3m x 3m bedroom to the right of the living room
```

Claude will:
1. Query the current spatial layout
2. Find the living room's position
3. Calculate the new room's position (adjacent to the right)
4. Create the bedroom

### Example 3: Create Walls Around a Room

```
Create walls around the living room
```

Claude will:
1. Get the living room's dimensions
2. Create 4 connected walls forming a rectangular enclosure

### Example 4: Multi-Story Building

```
Create a 2-story house:
- Ground floor: Living room (6m x 5m), Kitchen (4m x 4m)
- First floor: 2 bedrooms (4m x 4m each)
```

Claude will:
1. Create the ground floor level
2. Add living room and kitchen
3. Create the first floor level
4. Add two bedrooms

### Example 5: Check Current Layout

```
Show me the current room layout
```

Claude will display all rooms with their positions and dimensions.

## Available Tools

### Query Tools (Read-Only)

| Tool | Description |
|------|-------------|
| `bulc_get_spatial_context` | Get all rooms, walls, and their positions |
| `bulc_get_home_info` | Get project information |
| `bulc_list_rooms` | List all rooms |
| `bulc_list_walls` | List all walls |
| `bulc_list_levels` | List all floor levels |

### Creation Tools

| Tool | Description |
|------|-------------|
| `bulc_create_room` | Create a rectangular room |
| `bulc_create_room_polygon` | Create a polygon-shaped room |
| `bulc_create_wall` | Create a wall segment |
| `bulc_create_walls_rectangle` | Create 4 walls forming a rectangle |
| `bulc_create_level` | Create a new floor level |

### Modification Tools

| Tool | Description |
|------|-------------|
| `bulc_modify_room` | Modify room properties |
| `bulc_modify_wall` | Modify wall properties |
| `bulc_delete_room` | Delete a room |
| `bulc_delete_wall` | Delete a wall |
| `bulc_set_current_level` | Set active floor level |

### Utility Tools

| Tool | Description |
|------|-------------|
| `bulc_undo` | Undo last operation |
| `bulc_redo` | Redo last undone operation |
| `bulc_save` | Save the project |

## Coordinate System

```
        Z+ (elevation/height)
        │
        │   Y+ (north)
        │  /
        └──────► X+ (east)
      (0,0,0)

Unit: centimeters (cm)
1m = 100cm
```

## Configuration

### Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `BULC_PORT` | `19840` | TCP port for BULC connection |

## Privacy Policy

See [PRIVACY_POLICY.md](PRIVACY_POLICY.md)

**Summary**: This extension operates entirely locally. No data is collected, transmitted, or stored externally. All building designs remain on your local machine.

## Support

- **Issues**: [GitHub Issues](https://github.com/meteor-simulation/bulc-mcp-server/issues)
- **Email**: support@meteor-simulation.com
- **Website**: [meteor-simulation.com](https://meteor-simulation.com)

## License

MIT License - see [LICENSE](LICENSE)

## About

Developed by **Meteor Simulation Inc.**

BULC (Building Utility for Life-safety Calculations) is a fire dynamics simulator with evacuation analysis capabilities, built on SweetHome3D.

---

<p align="center">
  Made with ❤️ for architects, fire safety engineers, and building designers
</p>

---

# BULC 빌딩 디자이너 (한국어)

<p align="center">
  <img src="icon.png" alt="BULC 로고" width="200"/>
</p>

<p align="center">
  <strong>Claude Desktop을 위한 AI 기반 건물 설계 자동화</strong>
</p>

<p align="center">
  <a href="#개요">개요</a> •
  <a href="#기능">기능</a> •
  <a href="#설치-방법">설치</a> •
  <a href="#사용-방법">사용법</a> •
  <a href="#예시">예시</a>
</p>

---

## 개요

BULC 빌딩 디자이너는 Claude Desktop과 BULC 화재 시뮬레이션 소프트웨어를 연결하는 MCP(Model Context Protocol) 서버입니다. 자연어로 건물 설계가 가능합니다 - 원하는 것을 설명하면 Claude가 방, 벽, 다층 구조물을 자동으로 생성합니다.

## 기능

- **자연어 설계**: 일반 언어로 건물 설계 가능
- **방 생성**: 직사각형 및 다각형 모양의 방
- **벽 관리**: 개별 벽 또는 사각형 테두리 벽
- **다층 지원**: 다층 건물 설계 용이
- **공간 인식**: AI가 상대 위치 이해 ("거실 옆에")
- **실행 취소/다시 실행**: 작업 취소 및 재실행 지원
- **이중 언어**: 영어와 한국어 지원

## 설치 방법

### 사전 요구사항

1. **BULC 애플리케이션**: [Meteor Simulation](https://meteor-simulation.com)에서 다운로드
2. **Node.js**: 버전 16.0.0 이상
3. **Claude Desktop**: 최신 버전

### 설정

1. 저장소 클론:
```bash
git clone https://github.com/meteor-simulation/bulc-mcp-server.git
cd bulc-mcp-server
```

2. 종속성 설치:
```bash
npm install
```

3. 서버 빌드:
```bash
npm run build
```

4. Claude Desktop 설정:

`claude_desktop_config.json` 파일에 추가:

**Windows**: `%APPDATA%\Claude\claude_desktop_config.json`
**macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "bulc": {
      "command": "node",
      "args": ["<저장소-경로>/build/index.js"],
      "env": {
        "BULC_PORT": "19840"
      }
    }
  }
}
```

5. Claude Desktop 재시작

## 사용 방법

1. **BULC 애플리케이션 먼저 실행**
   - 콘솔에 `[BULC-MCP] Server started on port 19840` 메시지 확인

2. **Claude Desktop 열기**
   - MCP 서버가 자동으로 연결됨

3. **설계 시작**
   - Claude에게 방, 벽, 건물 생성 요청

## 예시

### 예시 1: 간단한 방 생성

```
5m x 4m 거실을 만들어줘
```

Claude가 수행:
1. 5m x 4m을 500cm x 400cm으로 변환
2. 위치 (0, 0)에 방 생성
3. "거실"로 이름 지정

### 예시 2: 인접한 방 추가

```
거실 오른쪽에 3m x 3m 침실을 추가해줘
```

Claude가 수행:
1. 현재 공간 레이아웃 조회
2. 거실 위치 찾기
3. 새 방의 위치 계산 (오른쪽에 인접)
4. 침실 생성

### 예시 3: 방 주위에 벽 생성

```
거실 주변에 벽을 만들어줘
```

Claude가 수행:
1. 거실의 크기 조회
2. 사각형 테두리를 형성하는 4개의 연결된 벽 생성

### 예시 4: 다층 건물

```
2층짜리 집을 만들어줘:
- 1층: 거실 (6m x 5m), 주방 (4m x 4m)
- 2층: 침실 2개 (각 4m x 4m)
```

Claude가 수행:
1. 1층 레벨 생성
2. 거실과 주방 추가
3. 2층 레벨 생성
4. 침실 2개 추가

### 예시 5: 현재 레이아웃 확인

```
현재 방 레이아웃을 보여줘
```

Claude가 모든 방의 위치와 크기를 표시합니다.

## 사용 가능한 도구

### 조회 도구 (읽기 전용)

| 도구 | 설명 |
|------|------|
| `bulc_get_spatial_context` | 모든 방, 벽 및 위치 조회 |
| `bulc_get_home_info` | 프로젝트 정보 조회 |
| `bulc_list_rooms` | 모든 방 목록 |
| `bulc_list_walls` | 모든 벽 목록 |
| `bulc_list_levels` | 모든 층 목록 |

### 생성 도구

| 도구 | 설명 |
|------|------|
| `bulc_create_room` | 직사각형 방 생성 |
| `bulc_create_room_polygon` | 다각형 방 생성 |
| `bulc_create_wall` | 벽 세그먼트 생성 |
| `bulc_create_walls_rectangle` | 사각형을 형성하는 4개의 벽 생성 |
| `bulc_create_level` | 새 층 레벨 생성 |

### 수정 도구

| 도구 | 설명 |
|------|------|
| `bulc_modify_room` | 방 속성 수정 |
| `bulc_modify_wall` | 벽 속성 수정 |
| `bulc_delete_room` | 방 삭제 |
| `bulc_delete_wall` | 벽 삭제 |
| `bulc_set_current_level` | 활성 층 레벨 설정 |

### 유틸리티 도구

| 도구 | 설명 |
|------|------|
| `bulc_undo` | 마지막 작업 취소 |
| `bulc_redo` | 마지막으로 취소한 작업 다시 실행 |
| `bulc_save` | 프로젝트 저장 |

## 좌표계

```
        Z+ (높이/고도)
        │
        │   Y+ (북쪽)
        │  /
        └──────► X+ (동쪽)
      (0,0,0)

단위: 센티미터 (cm)
1m = 100cm
```

## 설정

### 환경 변수

| 변수 | 기본값 | 설명 |
|------|--------|------|
| `BULC_PORT` | `19840` | BULC 연결용 TCP 포트 |

## 개인정보 보호정책

[PRIVACY_POLICY.md](PRIVACY_POLICY.md) 참조

**요약**: 이 확장 프로그램은 완전히 로컬에서 작동합니다. 데이터가 외부로 수집, 전송 또는 저장되지 않습니다. 모든 건물 설계는 로컬 컴퓨터에 유지됩니다.

## 지원

- **이슈**: [GitHub Issues](https://github.com/meteor-simulation/bulc-mcp-server/issues)
- **이메일**: support@meteor-simulation.com
- **웹사이트**: [meteor-simulation.com](https://meteor-simulation.com)

## 라이선스

MIT 라이선스 - [LICENSE](LICENSE) 참조

## 소개

**Meteor Simulation Inc.** 개발

BULC (Building Utility for Life-safety Calculations)는 SweetHome3D 기반의 피난 분석 기능을 갖춘 화재 역학 시뮬레이터입니다.

---

<p align="center">
  건축가, 소방 안전 엔지니어, 건물 설계자를 위해 ❤️로 제작
</p>




