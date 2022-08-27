class API {
  static base = 'https://be-rs-lang.herokuapp.com';

  private static users = `${API.base}/users`;

  private static words = `${API.base}/words`;

  static getJwt() {
    const user = JSON.parse(localStorage.getItem('userAuthenticationData') as string);
    return user;
  }

  static async getWords(group: number, page: number) {
    const response = await fetch(`${API.words}?page=${page}&group=${group}`);
    const content = await response.json();
    // console.log(content);
    return content;
  };

  static async getWord(wordId: string) {
    const response = await fetch(`${API.words}/${wordId}`);
    const content = await response.json();
    console.log(content);
    return content;
  };

  // USER:

  static async createUser(name: string, email: string, password: string) {
    const response = await fetch(API.users, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ "name": `${name}`, "email": `${email}`, "password": `${password}` })
    });

    if (response.status === 417) {
      throw new Error('User with this email is already registered');
    }

    if (response.status === 422) {
      throw new Error('Incorrect email address or password');
    }

    if (!response.ok) {
      throw new Error('Oops, something went wrong');
    }

    const content = await response.json();
    console.log(content);
    return content;
  };

  static async getUser() {
    const {userId, token} = API.getJwt();
    const response = await fetch(`${API.users}/${userId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    const content = await response.json();
    console.log('getUser', content);
    return content;
  };

  static async updateUser(email: string, password: string) {
    const {userId, token} = API.getJwt();
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

  static async deleteUser() {
    const {userId, token} = API.getJwt();
    await fetch(`${API.users}/${userId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    localStorage.removeItem('userAuthenticationData');
  };

  static async getNewToken() {
    const {userId, refreshToken} = API.getJwt();
    const response = await fetch(`${API.users}/${userId}/tokens`, {
      headers: {
        'Authorization': `Bearer ${refreshToken}`,
      },
    });
    const content = await response.json();
    localStorage.setItem('userAuthenticationData', JSON.stringify(content));
    console.log(content);
    return content;
  };

  // USER/WORDS:

  static async getUserWords() {
    const {userId, token} = API.getJwt();
    const response = await fetch(`${API.users}/${userId}/words`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    const content = await response.json();
    console.log(content);
    return content;
  };

  static async createUserWord(wordId: string, difficulty: string) {
    const {userId, token} = API.getJwt();
    const response = await fetch(`${API.users}/${userId}/words/${wordId}`, {
      method: 'POST',
      // credentials: 'include',
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

  static async getUserWord(wordId: string) {
    const {userId, token} = API.getJwt();
    const response = await fetch(`${API.users}/${userId}/words/${wordId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
    });
    if (response.status !== 404) {
      const content = await response.json();
      console.log(content);
      return content;
    }
    return false;
  }

  static async updateUserWord(wordId: string, difficulty: string) {
    const {userId, token} = API.getJwt();
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

  static async deleteUserWord(wordId: string) {
    const {userId, token} = API.getJwt();
    const response = await fetch(`${API.users}/${userId}/words/${wordId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    const content = await response.status;
    console.log(`Server response with status: ${content}`);
  }

  // USERS/AGGREGATED WORDS:

  static async getAggregatedWords() {
    const {userId, token} = API.getJwt();
    const filter = '?wordsPerPage=3600&filter={"userWord.difficulty":"hard"}';
    const response = await fetch(`${API.users}/${userId}/aggregatedWords${filter}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
    });
    const content = await response.json();
    console.log(content);
    return content;
  }

  static async getAggregatedWord(wordId:string) {
    const {userId, token} = API.getJwt();
    const response = await fetch(`${API.users}/${userId}/aggregatedWords/${wordId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
    });
    const content = await response.json();
    console.log(content);
    return content;
  }

  // USERS/STATISTICS:

  static async getStatistics() {
    const {userId, token} = API.getJwt();
    const response = await fetch(`${API.users}/${userId}/statistics`, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
    });
    const content = await response.json();
    console.log(content);
    return content;
  }

  static async upsertStatistics() {
    const {userId, token} = API.getJwt();
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

  // USERS/SETTINGS:

  static async getSettings() {
    const {userId, token} = API.getJwt();
    const response = await fetch(`${API.users}/${userId}/settings`, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
    });
    const content = await response.json();
    console.log(content);
    return content;
  }

  static async upsertSettings() {
    const {userId, token} = API.getJwt();
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

  // SIGNIN:

  static async loginUser(email: string, password: string) {
    const response = await fetch(`${API.base}/signin`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ "email": `${email}`, "password": `${password}` })
    });

    if (response.status === 404) {
      throw new Error('Cannot found user with this email address');
    }

    if (response.status === 403) {
      throw new Error('Incorrect email address or password');
    }

    if (!response.ok) {
      throw new Error('Oops, something went wrong');
    }

    const content = await response.json();
    console.log(content);
    localStorage.setItem('userAuthenticationData', JSON.stringify(content));
    return content;
  };
}

export default API;
