package edu.sjsu.cmpe275.model;

public class UserModel {
	
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((key == null) ? 0 : key.hashCode());
		return result;
	}
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		String other = (String) obj;
		if (key == null) {
			if (other != null)
				return false;
		} else if (!key.equals(obj))
			return false;
		return true;
	}
	private String key;
	private String message;
	public String getKey() {
		return key;
	}
	public void setKey(String key) {
		this.key = key;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	
	

}
