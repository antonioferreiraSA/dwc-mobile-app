import axios from 'redaxios';
import config from './config';
import logEvent from '../utils/logEvent';

// set the featured group, which is sorted to the top of the list of groups
const isFeaturedGroup = (groupName) =>
  groupName.toLowerCase().includes(config.featuredGroup);

/**
 * Get groups using the Rock's GroupFinder API
 * https://rock.echo.church/api/docs/index#/GroupFinder
 */
export async function getOpenGroups() {
  const { data } =
    (await axios.get(
      'https://rock.echo.church/api/GroupFinder/GetGroups/25?primaryAliasId=16536'
    )) || {};

  const { Success: isSuccessful, Data = [], Error } = data;

  if (!isSuccessful || !Data || !Array.isArray(Data)) {
    logEvent('ERROR loading groups', { error: Error });
    throw Error('Error loading groups');
  }

  return Data.filter(({ AtCapacity = false }) => !AtCapacity).sort(
    ({ Name = '' }, { Name: otherName = '' }) => {
      if (isFeaturedGroup(Name) && !isFeaturedGroup(otherName)) {
        return -1;
      }
      if (!isFeaturedGroup(Name) && isFeaturedGroup(otherName)) {
        return 1;
      }
      return 0;
    }
  );
}

export function askQuestion(groupId, firstName, lastName, email, question) {
  const data = {
    GroupId: groupId,
    FirstName: firstName.trim(),
    LastName: lastName.trim(),
    Email: email.trim(),
    Question: question.trim(),
  };

  if (__DEV__) {
    console.log({ data });
    return Promise.resolve({ Success: true });
  }

  return axios({
    method: 'post',
    url: 'https://rock.echo.church/api/GroupFinder/AskQuestion',
    data,
  });
}

export function joinGroup(groupId, firstName, lastName, email) {
  const data = {
    GroupId: groupId,
    FirstName: firstName.trim(),
    LastName: lastName.trim(),
    Email: email.trim(),
  };

  if (__DEV__) {
    console.log({ data });
    return Promise.resolve({ Success: true });
  }

  return axios({
    method: 'post',
    url: 'https://rock.echo.church/api/GroupFinder/JoinGroup',
    data,
  });
}
