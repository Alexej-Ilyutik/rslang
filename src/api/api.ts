class API {
  private static base = 'https://be-rs-lang.herokuapp.com';
  private static users = `${API.base}/users`;
  private static words = `${API.base}/words`;

  static async getWords(group: number, page: number) {
    const response = await fetch(`${API.words}?page=${page}&group=${group}`);
    const content = await response.json();
    console.log(content);
    return content;
  };

  static async getWord(wordId: string) {
    const response = await fetch(`${API.words}/${wordId}`);
    const content = await response.json();
    console.log(content);
    return content;
  };

  //USER:

  static async createUser(name: string, email: string, password: string) {
    const response = await fetch(API.users, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ "name": `${name}`, "email": `${email}`, "password": `${password}` })
    });
    const content = await response.json();
    console.log(content);
    return content;
  };

  static async getUser(userId: string, token: string) {
    const response = await fetch(`${API.users}/${userId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    const content = await response.json();
    console.log('getUser', content);
    return content;
  };

  static async updateUser(userId: string, email: string, password: string, token: string) {
    const response = await fetch(`${API.users}/${userId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ "email": `${email}`, "password": `${password}` })
    });
    const content = await response.json();
    console.log(content);
  };

  static async deleteUser(userId: string, token: string) {
    await fetch(`${API.users}/${userId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    localStorage.removeItem('userAuthenticationData');
  };

  static async getNewToken(userId: string, token: string) {
    const response = await fetch(`${API.users}/${userId}/tokens`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    const content = await response.json();
    console.log(content);
    return content;
  };

  //USER/WORDS:

  static async getUserWords(userId: string, token: string) {
    const response = await fetch(`${API.users}/${userId}/words`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    const content = await response.json();
    console.log(content);
    return content;
  };

  static async createUserWord(userId: string, wordId: string, difficulty: string, token: string) {
    const response = await fetch(`${API.users}/${userId}/words/${wordId}`, {
      method: 'POST',
      //credentials: 'include',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ "difficulty": `${difficulty}`, "optional": {} })
    });
    const content = await response.json();
    console.log(content);
    return content;
  };

  static async getUserWord(userId: string, wordId: string, token: string) {
    const response = await fetch(`${API.users}/${userId}/words/${wordId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
    });
    const content = await response.json();
    console.log(content);
    return content;
  }

  static async updateUserWord(userId: string, wordId: string, difficulty: string, token: string) {
    const response = await fetch(`${API.users}/${userId}/words/${wordId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ "difficulty": `${difficulty}`, "optional": {} })
    });
    const content = await response.json();
    console.log(content);
    return content;
  }

  static async deleteUserWord(userId: string, wordId: string, token: string) {
    const response = await fetch(`${API.users}/${userId}/words/${wordId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    const content = await response.json();
    console.log(content);
  }

  //USERS/AGGREGATED WORDS:

  static async getAggregatedWords(userId: string, token: string) {
    const response = await fetch(`${API.users}/${userId}/aggregatedWords?wordsPerPage=3600&filter={"userWord.difficulty":"hard"}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
    });
    const content = await response.json();
    console.log(content);
    return content;
  }

  static async getAggregatedWord(userId: string, wordId:string, token: string) {
    const response = await fetch(`${API.users}/${userId}/aggregatedWords/${wordId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
    });
    const content = await response.json();
    console.log(content);
    return content;
  }

  //USERS/STATISTICS:

  static async getStatistics(userId: string, token: string) {
    const response = await fetch(`${API.users}/${userId}/statistics`, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
    });
    const content = await response.json();
    console.log(content);
    return content;
  }

  static async upsertStatistics(userId: string, token: string) {
    const response = await fetch(`${API.users}/${userId}/statistics`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    });
    const content = await response.json();
    console.log(content);
    return content;
  }

  //USERS/SETTINGS:

  static async getSettings(userId: string, token: string) {
    const response = await fetch(`${API.users}/${userId}/settings`, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
    });
    const content = await response.json();
    console.log(content);
    return content;
  }

  static async upsertSettings(userId: string, token: string) {
    const response = await fetch(`${API.users}/${userId}/settings`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    });
    const content = await response.json();
    console.log(content);
    return content;
  }

  //SIGNIN:

  static async loginUser(email: string, password: string) {
    const response = await fetch(`${API.base}/signin`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ "email": `${email}`, "password": `${password}` })
    });
    const content = await response.json();
    console.log(content);
    localStorage.setItem('userAuthenticationData', JSON.stringify(content));
    return content;
  };
}

export default API;
